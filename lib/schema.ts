import { z } from "zod";

export const AnalysisSchema = z.object({
  overall_score: z
    .number()
    .int()
    .min(0)
    .max(100)
    .describe(
      "Weighted ATS match score: 0.45*required_skills + 0.25*experience_level + 0.30*context_fit, rounded to an integer.",
    ),
  breakdown: z.object({
    required_skills: z
      .number()
      .int()
      .min(0)
      .max(100)
      .describe(
        "Percent of hard skills and tools required by the JD that appear explicitly in the resume.",
      ),
    experience_level: z
      .number()
      .int()
      .min(0)
      .max(100)
      .describe(
        "How well the candidate's years of experience match the level the JD requires. 100 = exact match, 0 = off by 3+ years.",
      ),
    context_fit: z
      .number()
      .int()
      .min(0)
      .max(100)
      .describe(
        "How well the resume's domain, industries, and story map to the JD's domain and story.",
      ),
  }),
  missing_keywords: z
    .array(z.string())
    .max(8)
    .describe(
      "Up to 8 concrete, JD-specific keywords or tools that are present in the JD but absent from the resume.",
    ),
  strength_signals: z
    .array(z.string())
    .min(2)
    .max(4)
    .describe(
      "2 to 4 one-sentence callouts naming concrete resume items that directly match JD requirements.",
    ),
  cover_letter: z.object({
    greeting: z
      .string()
      .describe(
        "Single-line opening. Never 'Monsieur/Madame' in French — use Québec business register.",
      ),
    body: z
      .string()
      .describe(
        "Three to four paragraphs, 250 to 350 words total. Specific, honest, tied to resume evidence.",
      ),
    closing: z
      .string()
      .describe("Short closing line with a concrete call to action."),
  }),
});

export type Analysis = z.infer<typeof AnalysisSchema>;
