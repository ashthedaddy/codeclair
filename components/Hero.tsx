"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCallback } from "react";

import { CTAButton } from "@/components/CTAButton";
import { KineticMetric } from "@/components/KineticMetric";
import { SpotlightCard } from "@/components/SpotlightCard";
import { StatusChip } from "@/components/StatusChip";

const STACK = [
  "Structured Output",
  "AI SDK v6",
  "Zod structured output",
  "Next.js 16",
  "React 19",
  "Fluid Compute",
  "Québec French",
  "Temperature 0",
];

const HEADLINE_WORDS = ["Read", "any", "code", "like", "a", "senior", "would."];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const handleTryIt = useCallback(() => {
    const target = document.getElementById("tool");
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="relative border-b border-border">
      {/* Background layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 dot-grid dot-grid-mask opacity-[0.55]" />
        <div className="mesh-blob mesh-blob-a left-[-8rem] top-[-6rem] h-[34rem] w-[34rem] bg-accent/[0.09]" />
        <div className="mesh-blob mesh-blob-b right-[-10rem] bottom-[-10rem] h-[38rem] w-[38rem] bg-[#3b6dff]/[0.05]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 pb-16 pt-14 sm:px-10 sm:pb-20 sm:pt-20 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:pb-24 lg:pt-24">
        {/* Left: editorial headline */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.22em] text-muted-2"
          >
            <span className="h-px w-8 bg-border-strong" />
            <span>MTL · 001</span>
            <span>/</span>
            <span>bilingual code reader</span>
          </motion.div>

          <h1 className="font-serif text-[3.25rem] leading-[0.94] tracking-tight text-foreground sm:text-[4.5rem] lg:text-[5.75rem]">
            {HEADLINE_WORDS.map((word, i) => {
              const isAccent = word === "senior";
              return (
                <motion.span
                  key={i}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.05 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`mr-[0.25em] inline-block ${
                    isAccent ? "italic text-accent" : ""
                  }`}
                >
                  {word}
                </motion.span>
              );
            })}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-[52ch] text-[17px] leading-relaxed text-muted"
          >
            Paste a snippet. Get the walkthrough, Big-O, the risks a junior
            reader would miss, and the tests you&apos;d write before shipping —
            <span className="text-foreground">
              {" "}
              in English or Québec French
            </span>
            , streamed in about ten seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-4"
          >
            <CTAButton
              size="lg"
              variant="primary"
              onClick={handleTryIt}
              trailingIcon={<ArrowIcon />}
            >
              Try it now
            </CTAButton>
            <CTAButton
              size="md"
              variant="secondary"
              href="https://github.com/ashthedaddy/codeclair"
              target="_blank"
              rel="noreferrer"
              trailingIcon={<ExternalIcon />}
            >
              Source on GitHub
            </CTAButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid max-w-md grid-cols-3 divide-x divide-border"
          >
            <KineticMetric label="Time" value={10} suffix="s" />
            <KineticMetric label="Temp" value={0} fractionDigits={2} />
            <KineticMetric label="Langs" value={2} />
          </motion.div>
        </div>

        {/* Right: spec card with spotlight border */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24, rotateX: -6 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 1200 }}
          className="relative flex items-center lg:pl-4"
        >
          <SpecCardInner />
        </motion.div>
      </div>

      {/* Kinetic marquee */}
      <div className="relative overflow-hidden border-t border-border bg-surface/40 py-4">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap text-[11px] font-mono uppercase tracking-[0.22em] text-muted-2">
          {[...STACK, ...STACK].map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              <span>{item}</span>
              <span className="text-accent/60" aria-hidden>
                ◆
              </span>
            </span>
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent"
        />
      </div>
    </section>
  );
}

function SpecCardInner() {
  return (
    <SpotlightCard className="w-full p-6 sm:p-7 shadow-[0_60px_100px_-50px_rgba(0,0,0,0.8)]">
      <div className="absolute inset-0 overflow-hidden rounded-[22px]">
        <div className="scanline" />
      </div>

      <div className="relative flex items-center justify-between">
        <StatusChip tone="accent" label="output" value="stream" />
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-2">
          useDebounce.ts
        </div>
      </div>

      <div className="relative mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-2">
        Summary
      </div>
      <p className="relative mt-2 text-[13.5px] leading-relaxed text-foreground/90">
        A hook that waits until the caller stops changing a value for{" "}
        <span className="text-foreground">delay</span> ms, then commits it.
        Standard search-box pattern.
        <span className="stream-cursor" />
      </p>

      <div className="relative mt-6 grid grid-cols-2 gap-3">
        <SpecTile label="Time" value="O(1)" />
        <SpecTile label="Space" value="O(1)" />
      </div>

      <div className="relative mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-2">
        Risks
      </div>
      <ul className="relative mt-3 space-y-2.5">
        <RiskLine
          severity="medium"
          text="Stale closure if onFlush identity changes between renders"
        />
        <RiskLine
          severity="low"
          text="Initial render commits the raw value — intentional"
        />
      </ul>
    </SpotlightCard>
  );
}

function SpecTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/40 px-4 py-3">
      <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-2">
        {label}
      </div>
      <div className="mt-1 font-mono text-[18px] text-foreground">{value}</div>
    </div>
  );
}

function RiskLine({
  severity,
  text,
}: {
  severity: "high" | "medium" | "low";
  text: string;
}) {
  const dot =
    severity === "high"
      ? "bg-danger"
      : severity === "medium"
      ? "bg-accent"
      : "bg-muted-2";
  return (
    <li className="flex items-start gap-2.5 text-[12.5px] leading-snug text-muted">
      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
      <span>{text}</span>
    </li>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 7h8" />
      <path d="M7.5 3.5L11 7l-3.5 3.5" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 2h6v6" />
      <path d="M10 2L4 8" />
      <path d="M8 10H2V4" />
    </svg>
  );
}
