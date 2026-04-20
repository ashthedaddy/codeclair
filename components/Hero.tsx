"use client";

import type { CSSProperties } from "react";

import { HeroAura, MagneticButton, ScrambleWord, useTilt } from "@/components/lux";
import { KineticMetric } from "@/components/KineticMetric";
import { StatusChip } from "@/components/StatusChip";
import { t } from "@/lib/i18n";
import type { Language } from "@/lib/systemPrompt";

const STACK_ITEMS = [
  "Structured Output", "AI SDK v6", "Zod schema", "Next.js 16", "React 19",
  "Fluid Compute", "Québec French", "Temperature 0", "Streaming JSON",
  "Prompt Injection Guard",
];

interface HeroProps {
  onTryIt: () => void;
  language: Language;
}

function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 7h8" /><path d="M7.5 3.5L11 7l-3.5 3.5" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 2h6v6" /><path d="M10 2L4 8" /><path d="M8 10H2V4" />
    </svg>
  );
}

export function Hero({ onTryIt, language }: HeroProps) {
  const s = t(language).hero;
  return (
    <section className="hero">
      <div className="hero-bg">
        <div
          className="mesh-blob floaty"
          style={{
            left: "-8rem", top: "-6rem", width: "34rem", height: "34rem",
            background: "color-mix(in oklab, var(--accent) 14%, transparent)",
          }}
        />
        <div
          className="mesh-blob floaty"
          style={{
            right: "-10rem", bottom: "-10rem", width: "38rem", height: "38rem",
            background: "oklch(0.72 0.13 275 / 0.08)",
            animationDelay: "3s",
          }}
        />
        <HeroAura />
        <div className="fade-bottom" />
      </div>

      <div className="hero-inner">
        <div>
          <div className="meta-row">
            <span className="tick" />
            <span>{s.dossier}</span>
            <span>·</span>
            <span>{s.mtl}</span>
            <span>·</span>
            <span>{s.tagline}</span>
          </div>

          <h1 className="headline" key={language}>
            {s.headline.map((word, i) => {
              const accent = i === s.accentWordIndex;
              return (
                <span
                  key={i}
                  className={accent ? "accent" : ""}
                  style={{ fontStyle: accent ? "italic" : "normal" }}
                >
                  <ScrambleWord word={word} delay={120 + i * 90} />
                </span>
              );
            })}
          </h1>

          <p className="dek slide-up" style={{ ["--i" as string]: 9 } as CSSProperties}>
            {s.dekBefore}
            <strong>{s.dekStrong}</strong>
            {s.dekAfter}
          </p>

          <div
            className="slide-up"
            style={{
              marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap",
              ["--i" as string]: 10,
            } as CSSProperties}
          >
            <MagneticButton className="btn btn-primary btn-lg" onClick={onTryIt}>
              {s.tryIt} <ArrowIcon />
            </MagneticButton>
            <MagneticButton
              className="btn btn-secondary"
              href="https://github.com/ashthedaddy/codeclair"
              target="_blank"
              rel="noreferrer"
              strength={0.18}
            >
              {s.source} <ExternalIcon />
            </MagneticButton>
          </div>

          <div className="metrics slide-up" style={{ ["--i" as string]: 11 } as CSSProperties}>
            <KineticMetric label={s.metrics.stream} value={10} unit="s" />
            <KineticMetric label={s.metrics.temp} value={0} fractionDigits={2} />
            <KineticMetric label={s.metrics.langs} value={2} />
          </div>
        </div>

        <div className="slide-up spec-tilt" style={{ ["--i" as string]: 2 } as CSSProperties}>
          <SpecCardTilt language={language} />
        </div>
      </div>

      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS].map((item, i) => (
            <span key={i} className="item">
              <span>{item}</span>
              <span className="dia">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecCardTilt({ language }: { language: Language }) {
  const ref = useTilt<HTMLDivElement>(7);
  const s = t(language).hero.spec;
  return (
    <div className="spec" ref={ref}>
      <div className="scanline" />
      <div className="spec-head">
        <StatusChip tone="accent" label={s.output} value={s.stream} />
        <span className="spec-filename">useDebounce.ts</span>
      </div>

      <div style={{ marginTop: 18 }} className="kicker">{s.summary}</div>
      <p className="spec-summary">
        {s.specSummaryBefore}
        <span style={{ color: "var(--fg)" }}>{s.specSummaryEmph}</span>
        {s.specSummaryAfter}
        <span className="caret" />
      </p>

      <div className="spec-grid">
        <div className="spec-tile"><div className="l">{s.time}</div><div className="v">O(1)</div></div>
        <div className="spec-tile"><div className="l">{s.space}</div><div className="v">O(1)</div></div>
      </div>

      <div style={{ marginTop: 20 }} className="kicker">{s.risks}</div>
      <ul className="risk-list">
        <li>
          <span className="sev-dot sev-medium" /> {s.risk1a}
          <code style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--fg-soft)" }}>{s.risk1codeName}</code>
          {s.risk1b}
        </li>
        <li>
          <span className="sev-dot sev-low" /> {s.risk2}
        </li>
      </ul>
    </div>
  );
}
