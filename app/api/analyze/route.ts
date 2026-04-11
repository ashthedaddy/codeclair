import { anthropic } from "@ai-sdk/anthropic";
import { Output, streamText } from "ai";
import { z } from "zod";

import { AnalysisSchema } from "@/lib/schema";
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

  try {
    const result = streamText({
      model: anthropic(MODEL_ID),
      temperature: 0,
      system,
      prompt:
        "Analyze the job description and resume above using the rubric and return the structured object.",
      output: Output.object({ schema: AnalysisSchema }),
      onError({ error }) {
        console.error("[analyze] stream error", error);
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("[analyze] model error", error);
    return errorResponse(502, "MODEL_ERROR", {
      message: error instanceof Error ? error.message : "unknown",
    });
  }
}

export function GET(): Response {
  return errorResponse(405, "METHOD_NOT_ALLOWED");
}
