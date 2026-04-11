"use client";

import { useCallback } from "react";

export function Hero() {
  const handleTryIt = useCallback(() => {
    const target = document.getElementById("tool");
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center sm:px-10 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-14rem] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-accent-violet/18 blur-[160px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-18rem] right-[8%] h-[34rem] w-[34rem] rounded-full bg-accent-cyan/12 blur-[160px]"
      />

      <div className="relative flex max-w-4xl flex-col items-center gap-7">
        <span className="rounded-full border border-border/80 bg-surface/60 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-muted backdrop-blur">
          Montréal · bilingual · streaming
        </span>

        <h1 className="font-serif text-6xl leading-[0.92] tracking-tight sm:text-7xl lg:text-[8rem]">
          <span className="gradient-text">codeclair</span>
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-foreground/85 sm:text-xl">
          Paste any code. Get a walkthrough, Big-O complexity, the risks a
          junior reader would miss, and the tests you'd write before shipping it
          —{" "}
          <span className="text-foreground">
            in English or Québec French
          </span>
          , streamed in about ten seconds.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
          <button
            type="button"
            onClick={handleTryIt}
            className="rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan px-8 py-3.5 text-base font-semibold text-background shadow-[0_0_48px_var(--accent-glow)] transition hover:brightness-110"
          >
            Try it →
          </button>
          <a
            href="https://github.com/ashthedaddy/codeclair"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium text-muted backdrop-blur transition hover:border-border/60 hover:text-foreground"
          >
            Source on GitHub ↗
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-2">
          <span>Claude Sonnet 4.6</span>
          <span className="opacity-40">·</span>
          <span>AI SDK v6</span>
          <span className="opacity-40">·</span>
          <span>Zod structured output</span>
          <span className="opacity-40">·</span>
          <span>Next.js 16</span>
          <span className="opacity-40">·</span>
          <span>Fluid Compute</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleTryIt}
        aria-label="Scroll to the tool"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-2 transition hover:text-foreground"
      >
        <span className="inline-block animate-bounce">↓</span>
      </button>
    </section>
  );
}
