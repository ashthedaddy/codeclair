import { z } from "zod";

export const CodeExplanationSchema = z.object({
  summary: z
    .string()
    .describe(
      "One to two sentence plain-language description of what the code does and why someone would use it.",
    ),
  walkthrough: z
    .array(
      z.object({
        anchor: z
          .string()
          .describe(
            "Short label for the code region being explained — e.g. a function name, a hook call, a branch. 1 to 6 words.",
          ),
        explanation: z
          .string()
          .describe(
            "Two to four sentences explaining what this region does, why it's written this way, and any subtle behavior a reader might miss.",
          ),
      }),
    )
    .min(3)
    .max(8)
    .describe(
      "Ordered walkthrough of the code, 3 to 8 anchored sections. Sections should follow the code's execution flow, not file order.",
    ),
  complexity: z.object({
    time: z
      .string()
      .describe(
        "Big-O time complexity, e.g. 'O(n)', 'O(n log n)', 'O(1) amortized'. Use standard notation.",
      ),
    space: z
      .string()
      .describe("Big-O space complexity using the same notation as time."),
    notes: z
      .string()
      .describe(
        "One to two sentences explaining the dominant cost and any hidden allocations, closures, or re-renders that affect real-world performance.",
      ),
  }),
  risks: z
    .array(
      z.object({
        severity: z.enum(["high", "medium", "low"]),
        title: z.string().describe("Short name for the risk. 1 to 8 words."),
        detail: z
          .string()
          .describe(
            "One to three sentences describing the risk, when it triggers, and the concrete consequence.",
          ),
      }),
    )
    .max(5)
    .describe(
      "Zero to 5 concrete risks: bugs, footguns, race conditions, stale-closure issues, missing cleanup, security holes. Do not pad. If the code is genuinely clean, return an empty array.",
    ),
  tests_to_write: z
    .array(z.string())
    .min(2)
    .max(6)
    .describe(
      "2 to 6 one-line test case descriptions covering the most important behaviors and edge cases, in priority order.",
    ),
});

export type CodeExplanation = z.infer<typeof CodeExplanationSchema>;

// Anthropic's structured-output endpoint rejects JSON Schema constraints
// like `minimum`, `maximum`, `minItems`, `maxItems`, and `enum` on nested
// fields in some shapes. We pass this loose schema to the model call and
// enforce bounds via the system prompt + temperature 0. `CodeExplanationSchema`
// above stays strict and is the source of truth for client-side types,
// validation, and the README.
export const ModelCodeExplanationSchema = z.object({
  summary: z
    .string()
    .describe(
      "One to two sentence plain-language description of what the code does and why someone would use it.",
    ),
  walkthrough: z
    .array(
      z.object({
        anchor: z
          .string()
          .describe(
            "Short label for the code region being explained. 1 to 6 words.",
          ),
        explanation: z
          .string()
          .describe(
            "Two to four sentences explaining what this region does, why it's written this way, and any subtle behavior a reader might miss.",
          ),
      }),
    )
    .describe(
      "Ordered walkthrough of the code, 3 to 8 anchored sections following execution flow.",
    ),
  complexity: z.object({
    time: z
      .string()
      .describe("Big-O time complexity, e.g. 'O(n)', 'O(n log n)', 'O(1)'."),
    space: z.string().describe("Big-O space complexity."),
    notes: z
      .string()
      .describe(
        "One to two sentences explaining the dominant cost and hidden allocations, closures, or re-renders.",
      ),
  }),
  risks: z
    .array(
      z.object({
        severity: z
          .string()
          .describe("One of: 'high', 'medium', 'low'."),
        title: z.string().describe("Short name for the risk. 1 to 8 words."),
        detail: z
          .string()
          .describe(
            "One to three sentences describing the risk, when it triggers, and the concrete consequence.",
          ),
      }),
    )
    .describe(
      "0 to 5 concrete risks: bugs, footguns, race conditions, stale closures, missing cleanup, security holes. Do not pad.",
    ),
  tests_to_write: z
    .array(z.string())
    .describe(
      "2 to 6 one-line test case descriptions covering the most important behaviors and edge cases, in priority order.",
    ),
});
