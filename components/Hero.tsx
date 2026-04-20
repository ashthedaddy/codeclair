"use client";

import type { CSSProperties } from "react";

import { HeroAura, MagneticButton, ScrambleWord, useTilt } from "@/components/lux";
import { KineticMetric } from "@/components/KineticMetric";
import { StatusChip } from "@/components/StatusChip";

interface HeadlineToken { w: string; accent: boolean; italic: boolean }

const HEADLINE_WORDS: HeadlineToken[] = [
  { w: "Read", accent: false, italic: false },
  { w: "any", accent: false, italic: false },
  { w: "code", accent: false, italic: false },
  { w: "the", accent: false, italic: false },
  { w: "way", accent: false, italic: false },
  { w: "a", accent: false, italic: false },
  { w: "senior", accent: true, italic: true },
  { w: "would.", accent: false, italic: false },
];

const STACK_ITEMS = [
  "Structured Output", "AI SDK v6", "Zod schema", "Next.js 16", "React 19",
  "Fluid Compute", "Québec French", "Temperature 0", "Streaming JSON",
  "Prompt Injection Guard",
];

interface HeroProps {
  onTryIt: () => void;
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

export function Hero({ onTryIt }: HeroProps) {
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
            <span>Dossier N° 001</span>
            <span>·</span>
            <span>MTL</span>
            <span>·</span>
            <span>Bilingual Code Reader</span>
          </div>

          <h1 className="headline">
            {HEADLINE_WORDS.map((t, i) => (
              <span
                key={i}
                className={t.accent ? "accent" : ""}
                style={{ fontStyle: t.italic ? "italic" : "normal" }}
              >
                <ScrambleWord word={t.w} delay={120 + i * 90} />
              </span>
            ))}
          </h1>

          <p className="dek slide-up" style={{ ["--i" as string]: 9 } as CSSProperties}>
            Paste a snippet. Get the walkthrough, Big-O, the risks a junior reader would miss, and the tests you&rsquo;d write before shipping &mdash;
            <strong> in English or Québec French</strong>, streamed in about ten seconds.
          </p>

          <div
            className="slide-up"
            style={{
              marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap",
              ["--i" as string]: 10,
            } as CSSProperties}
          >
            <MagneticButton className="btn btn-primary btn-lg" onClick={onTryIt}>
              Try it on a snippet <ArrowIcon />
            </MagneticButton>
            <MagneticButton
              className="btn btn-secondary"
              href="https://github.com/ashthedaddy/codeclair"
              target="_blank"
              rel="noreferrer"
              strength={0.18}
            >
              Source on GitHub <ExternalIcon />
            </MagneticButton>
          </div>

          <div className="metrics slide-up" style={{ ["--i" as string]: 11 } as CSSProperties}>
            <KineticMetric label="Stream" value={10} unit="s" />
            <KineticMetric label="Temp" value={0} fractionDigits={2} />
            <KineticMetric label="Langs" value={2} />
          </div>
        </div>

        <div className="slide-up spec-tilt" style={{ ["--i" as string]: 2 } as CSSProperties}>
          <SpecCardTilt />
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

function SpecCardTilt() {
  const ref = useTilt<HTMLDivElement>(7);
  return (
    <div className="spec" ref={ref}>
      <div className="scanline" />
      <div className="spec-head">
        <StatusChip tone="accent" label="output" value="stream" />
        <span className="spec-filename">useDebounce.ts</span>
      </div>

      <div style={{ marginTop: 18 }} className="kicker">Summary</div>
      <p className="spec-summary">
        A hook that waits until the caller stops changing a value for{" "}
        <span style={{ color: "var(--fg)" }}>delay</span> ms, then commits it.
        Standard search-box pattern.
        <span className="caret" />
      </p>

      <div className="spec-grid">
        <div className="spec-tile"><div className="l">Time</div><div className="v">O(1)</div></div>
        <div className="spec-tile"><div className="l">Space</div><div className="v">O(1)</div></div>
      </div>

      <div style={{ marginTop: 20 }} className="kicker">Risks</div>
      <ul className="risk-list">
        <li>
          <span className="sev-dot sev-medium" /> Stale closure if{" "}
          <code style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--fg-soft)" }}>value</code>{" "}
          is an object literal
        </li>
        <li>
          <span className="sev-dot sev-low" /> Initial render commits raw value &mdash; intentional
        </li>
      </ul>
    </div>
  );
}
