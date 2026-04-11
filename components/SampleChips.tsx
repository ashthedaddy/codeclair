"use client";

import { SAMPLES, type SampleId } from "@/lib/samples";

interface SampleChipsProps {
  activeSampleId: SampleId | null;
  onSelect: (id: SampleId) => void;
}

export function SampleChips({ activeSampleId, onSelect }: SampleChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[10px] font-mono uppercase tracking-[0.22em] text-muted-2">
        Try:
      </span>
      {SAMPLES.map((sample) => {
        const active = sample.id === activeSampleId;
        return (
          <button
            key={sample.id}
            type="button"
            onClick={() => onSelect(sample.id)}
            aria-pressed={active}
            className={`tactile flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] ${
              active
                ? "border-accent/50 bg-accent/10 text-foreground"
                : "border-border bg-surface text-muted hover:border-border-strong hover:text-foreground"
            }`}
          >
            <span
              className={`font-mono text-[9px] uppercase tracking-[0.18em] ${
                active ? "text-accent" : "text-muted-2"
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
