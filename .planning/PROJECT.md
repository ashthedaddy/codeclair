# CareerLens → codeclair (pivoted 2026-04-11)

> **Pivot note:** Mid-Evening-2, this project pivoted from an ATS analyzer
> ("CareerLens") to a bilingual code explainer ("codeclair"). Rationale:
> shipping an ATS scorer to recruiters reads wrong ("why are you showing
> them you know how their scoring works"). The Evening 1 plumbing
> (streaming route, 502-on-error fix, rate limit, strict+loose Zod schema
> pattern, XML input isolation, 5-test vitest suite) carried over 1:1 —
> only the domain changed. The sections below still describe the
> original CareerLens scope; see commits after \`f084dd6\` for the
> codeclair refactors and \`.planning/phases/phase-1-v1/PLAN.md\` for the
> same note at the phase level.

## What This Is

A bilingual (EN/FR) AI-powered ATS analyzer + cover letter generator. Paste a job description and your resume, get a Claude-scored match rating with a breakdown and a tailored cover letter — streaming in ~10 seconds. Stateless, no auth, single page, built in 2-3 evenings as Arshia's flagship public GitHub repo for the April 2026 job hunt.

## Core Value

Fix the GitHub credibility gap during active job hunt. A recruiter clicks `github.com/ashthedaddy`, sees `careerlens` pinned #1 with a live demo URL, uses the tool for 30 seconds, and thinks *"this person actually ships AI products."* Every decision optimized against that single outcome.

## Requirements

### Active (all in Phase 1 — v1 build)

- [ ] Stateless tool with prefilled sample (Stripe Full-Stack JD + Arshia's real CV) — single click to magic
- [ ] Visible EN | FR output toggle in header — cross-language flex is the moat
- [ ] ATS score (0-100) with rubric breakdown: required_skills, experience_level, context_fit
- [ ] Tailored cover letter (greeting / body / closing), streams in via AI SDK v6 `streamObject`
- [ ] Pure AI scoring — temp 0, Zod-validated structured output, rubric in system prompt
- [ ] XML-tag input isolation against prompt injection
- [ ] Quebec French (not France French) enforced via prompt + negative-test blocklist
- [ ] In-memory IP rate limiter (10/hour) on `/api/analyze`
- [ ] Dark-mode AI-native aesthetic (violet → cyan gradient, streaming shimmer, serif hero)
- [ ] Recruiter-magnet README with live demo, prompt code block, schema, v2 roadmap
- [ ] Deploy to `careerlens.vercel.app`, pin repo on GitHub with topics + description

### Out of Scope (v2 roadmap — taste signal in README)

- Supabase magic-link auth + history with RLS
- PDF / DOCX resume upload
- Per-bullet rewrites with JD citation
- Vercel AI Gateway (observability + fallbacks)
- Upstash Redis rate limiter
- Puppeteer / LinkedIn URL JD import
- Light-mode toggle
- Per-analysis shareable URLs

## Context

- **Platform:** Next.js 16 App Router, React 19, TypeScript, Tailwind 4, shadcn/ui
- **AI:** AI SDK v6 + `@ai-sdk/anthropic`, `streamObject`, `claude-sonnet-4-6`, temp 0
- **Validation:** Zod — single source of truth for output schema, types, server validation
- **Runtime:** Vercel Fluid Compute (Node), NOT Edge (per Vercel 2026 guidance)
- **Config:** `vercel.ts` typed config (not `vercel.json`)
- **Framework discipline:** read `node_modules/next/dist/docs/` before writing App Router / streaming / config code. Do not trust training-data Next.js memory.
- **Sample data:** Arshia's real CV from `~/Desktop/career-ops/cv.md`, real Stripe Full-Stack (Canada remote) JD — inlined at build into `lib/samples.ts` so runtime has zero filesystem dependency

## Key Decisions (locked in brainstorming, 2026-04-11)

| # | Decision | Choice |
|---|----------|--------|
| Q1 | Auth / DB | Stateless, no auth, localStorage only |
| Q2 | Output scope | ATS score + cover letter (no bullet rewrites) |
| Q3 | Bilingual | v1 with visible EN \| FR toggle |
| Q4 | First 5 seconds | Prefilled with real CV + Stripe JD |
| Q5 | ATS method | Pure AI, temp 0, Zod structured output |
| Q6 | Visual | AI-native dark mode + prominent EN\|FR toggle + `• Mtl` footer |
| Q7 | Sample JD | Stripe Full-Stack Engineer (Canada remote) |

Full rationale: `.planning/phases/phase-1-v1/PLAN.md`
