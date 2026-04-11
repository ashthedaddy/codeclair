"use client";

import { SAMPLES, type SampleId } from "@/lib/samples";

interface SampleChipsProps {
  activeSampleId: SampleId | null;
  onSelect: (id: SampleId) => void;
}

export function SampleChips({ activeSampleId, onSelect }: SampleChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-2">
        Try a sample:
      </span>
      {SAMPLES.map((sample) => {
        const active = sample.id === activeSampleId;
        return (
          <button
            key={sample.id}
            type="button"
            onClick={() => onSelect(sample.id)}
            aria-pressed={active}
            className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs transition ${
              active
                ? "border-accent-violet/60 bg-accent-violet/10 text-foreground shadow-[0_0_16px_var(--accent-glow)]"
                : "border-border bg-surface text-muted hover:border-border/60 hover:text-foreground"
            }`}
          >
            <span
              className={`font-mono text-[9px] uppercase tracking-[0.14em] ${
                active ? "text-accent-cyan" : "text-muted-2"
              }`}
            >
              {sample.tag}
            </span>
            <span>{sample.label}</span>
          </button>
        );
      })}
    </div>
  );
}
