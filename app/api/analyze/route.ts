import { anthropic } from "@ai-sdk/anthropic";
import { Output, streamText } from "ai";
import { z } from "zod";

import { ModelAnalysisSchema } from "@/lib/schema";
import { checkRateLimit, extractClientIp } from "@/lib/rateLimit";
import { renderSystemPrompt } from "@/lib/systemPrompt";

const MODEL_ID = "claude-sonnet-4-6";

const InputSchema = z.object({
  jd: z.string().min(100).max(8000),
  resume: z.string().min(100).max(8000),
  language: z.enum(["en", "fr"]),
  regenerate: z.boolean().optional(),
});

function errorResponse(
  status: number,
  code: string,
  extra: Record<string, unknown> = {},
): Response {
  return Response.json({ code, ...extra }, { status });
}

export async function POST(request: Request): Promise<Response> {
  const ip = extractClientIp(request);
  const limit = checkRateLimit(ip);
  if (!limit.ok) {
    return errorResponse(429, "RATE_LIMITED", {
      retryAfterSec: limit.retryAfterSec,
    });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return errorResponse(400, "INVALID_INPUT", { field: "body" });
  }

  const parsed = InputSchema.safeParse(raw);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return errorResponse(400, "INVALID_INPUT", {
      field: firstIssue?.path.join(".") ?? "body",
      message: firstIssue?.message ?? "invalid input",
    });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return errorResponse(500, "CONFIG_ERROR", {
      message: "ANTHROPIC_API_KEY is not set",
    });
  }

  const { jd, resume, language, regenerate } = parsed.data;
  const system = renderSystemPrompt({ jd, resume, language, regenerate });

  let result;
  try {
    result = streamText({
      model: anthropic(MODEL_ID),
      temperature: 0,
      system,
      prompt:
        "Analyze the job description and resume above using the rubric and return the structured object.",
      output: Output.object({ schema: ModelAnalysisSchema }),
      onError({ error }) {
        console.error("[analyze] stream error", error);
      },
    });
  } catch (error) {
    console.error("[analyze] model init error", error);
    return errorResponse(502, "MODEL_ERROR", {
      message: error instanceof Error ? error.message : "unknown",
    });
  }

  // `toTextStreamResponse()` commits a 200 before the first chunk arrives,
  // so a mid-stream error from the provider becomes a silent empty 200.
  // Walk `fullStream` ourselves: hold the response until we see either a
  // `text-delta` (commit 200 + stream) or an `error` / clean end with no
  // text (return 502 JSON while headers are still uncommitted).
  const iterator = result.fullStream[Symbol.asyncIterator]();
  const encoder = new TextEncoder();

  while (true) {
    let step: Awaited<ReturnType<typeof iterator.next>>;
    try {
      step = await iterator.next();
    } catch (error) {
      console.error("[analyze] stream iteration error", error);
      return errorResponse(502, "MODEL_ERROR", {
        message: error instanceof Error ? error.message : "unknown",
      });
    }

    if (step.done) {
      return errorResponse(502, "MODEL_ERROR", {
        message: "model produced no output",
      });
    }

    const part = step.value;

    if (part.type === "error") {
      console.error("[analyze] provider error", part.error);
      return errorResponse(502, "MODEL_ERROR", {
        message: part.error instanceof Error ? part.error.message : "provider error",
      });
    }

    if (part.type === "text-delta") {
      const firstChunk = part.text;
      const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
          controller.enqueue(encoder.encode(firstChunk));
          try {
            while (true) {
              const next = await iterator.next();
              if (next.done) break;
              const nextPart = next.value;
              if (nextPart.type === "text-delta") {
                controller.enqueue(encoder.encode(nextPart.text));
              } else if (nextPart.type === "error") {
                console.error("[analyze] mid-stream provider error", nextPart.error);
                controller.error(nextPart.error);
                return;
              }
            }
            controller.close();
          } catch (error) {
            console.error("[analyze] mid-stream iteration error", error);
            controller.error(error);
          }
        },
      });

      return new Response(stream, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
      });
    }
    // Non-text, non-error part (start, start-step, reasoning, etc.) — keep polling.
  }
}

export function GET(): Response {
  return errorResponse(405, "METHOD_NOT_ALLOWED");
}
