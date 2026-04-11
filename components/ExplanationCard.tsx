"use client";

import type { DeepPartial } from "ai";
import type { CodeExplanation } from "@/lib/schema";

interface ExplanationCardProps {
  explanation: DeepPartial<CodeExplanation> | null;
  isStreaming: boolean;
  error: string | null;
}

export function ExplanationCard({
  explanation,
  isStreaming,
  error,
}: ExplanationCardProps) {
  if (error) {
    return (
      <EmptyState>
        <div className="text-danger">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em]">
            Error
          </div>
          <div className="mt-2 text-[14px] text-foreground/90">{error}</div>
        </div>
      </EmptyState>
    );
  }

  if (!explanation && !isStreaming) {
    return (
      <EmptyState>
        <div className="max-w-[40ch] text-[14px] leading-relaxed text-muted">
          Paste a snippet on the left and hit{" "}
          <span className="text-foreground">Explain</span>. You&apos;ll get a
          plain-language walkthrough, Big-O, risks to watch, and tests to write
          — streamed in ~10 seconds.
        </div>
      </EmptyState>
    );
  }

  if (!explanation && isStreaming) {
    return (
      <EmptyState>
        <div className="text-muted">
          <span className="stream-cursor font-mono text-[13px] uppercase tracking-[0.18em]">
            Thinking
          </span>
        </div>
      </EmptyState>
    );
  }

  return (
    <div className="flex h-full flex-col gap-7 overflow-y-auto rounded-[20px] border border-border bg-surface p-6 sm:p-8">
      {explanation?.summary && (
        <Section label="Summary" index={0}>
          <p className="text-[16px] leading-relaxed text-foreground">
            {explanation.summary}
            {isStreaming && !explanation.walkthrough?.length ? (
              <span className="stream-cursor" />
            ) : null}
          </p>
        </Section>
      )}

      {explanation?.walkthrough && explanation.walkthrough.length > 0 && (
        <Section label="Walkthrough" index={1}>
          <ol className="flex flex-col">
            {explanation.walkthrough.map((step, index) => (
              <li
                key={index}
                className="animate-slide-up border-l border-border pl-5 pb-5 last:pb-0"
                style={{ ["--i" as string]: index }}
              >
                <div className="relative">
                  <span className="absolute -left-[22px] top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    {step?.anchor || ""}
                  </div>
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-foreground/90">
                  {step?.explanation || ""}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {explanation?.complexity && (
        <Section label="Complexity" index={2}>
          <div className="grid grid-cols-2 divide-x divide-border border-y border-border">
            <ComplexityTile
              label="Time"
              value={explanation.complexity.time || "—"}
            />
            <ComplexityTile
              label="Space"
              value={explanation.complexity.space || "—"}
            />
          </div>
          {explanation.complexity.notes && (
            <p className="mt-4 text-[13px] leading-relaxed text-muted">
              {explanation.complexity.notes}
            </p>
          )}
        </Section>
      )}

      {explanation?.risks && explanation.risks.length > 0 && (
        <Section label="Risks" index={3}>
          <ul className="flex flex-col divide-y divide-border border-y border-border">
            {explanation.risks.map((risk, index) =>
              risk ? <RiskItem key={index} risk={risk} index={index} /> : null,
            )}
          </ul>
        </Section>
      )}

      {explanation?.tests_to_write && explanation.tests_to_write.length > 0 && (
        <Section label="Tests to write" index={4}>
          <ul className="flex flex-col gap-2.5">
            {explanation.tests_to_write.map((test, index) => (
              <li
                key={index}
                className="animate-slide-up flex gap-3 text-[13.5px] leading-relaxed text-foreground/90"
                style={{ ["--i" as string]: index }}
              >
                <span className="font-mono text-[11px] text-accent tabular-nums">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <span>{test}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-[26rem] items-center justify-center rounded-[20px] border border-dashed border-border bg-surface/40 p-10 text-center">
      {children}
    </div>
  );
}

function Section({
  label,
  index,
  children,
}: {
  label: string;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <section
      className="animate-slide-up"
      style={{ ["--i" as string]: index }}
    >
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-2">
        {label}
      </div>
      {children}
    </section>
  );
}

function ComplexityTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-4 first:pl-0">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-2">
        {label}
      </div>
      <div className="mt-1 font-mono text-[20px] text-foreground tabular-nums">
        {value}
      </div>
    </div>
  );
}

const SEVERITY_STYLES: Record<string, { dot: string; label: string }> = {
  high: { dot: "bg-danger", label: "text-danger" },
  medium: { dot: "bg-accent", label: "text-accent" },
  low: { dot: "bg-muted-2", label: "text-muted" },
};

function RiskItem({
  risk,
  index,
}: {
  risk: DeepPartial<CodeExplanation["risks"][number]>;
  index: number;
}) {
  const severity = (risk?.severity ?? "low").toLowerCase();
  const style = SEVERITY_STYLES[severity] ?? SEVERITY_STYLES.low;
  return (
    <li
      className="animate-slide-up py-4 first:pt-4 last:pb-4"
      style={{ ["--i" as string]: index }}
    >
      <div className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
        <span
          className={`font-mono text-[10px] font-semibold uppercase tracking-[0.22em] ${style.label}`}
        >
          {severity}
        </span>
      </div>
      <div className="mt-2 text-[14px] font-medium text-foreground">
        {risk?.title || ""}
      </div>
      {risk?.detail && (
        <p className="mt-1 text-[13px] leading-relaxed text-muted">
          {risk.detail}
        </p>
      )}
    </li>
  );
}
