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
          <div className="text-sm font-medium uppercase tracking-[0.18em]">
            Error
          </div>
          <div className="mt-2 text-base">{error}</div>
        </div>
      </EmptyState>
    );
  }

  if (!explanation && !isStreaming) {
    return (
      <EmptyState>
        <div className="text-muted">
          Paste a snippet on the left and click <strong>Explain</strong>. You'll
          get a plain-language walkthrough, Big-O complexity, risks to watch,
          and tests to write — streaming in ~10 seconds.
        </div>
      </EmptyState>
    );
  }

  if (!explanation && isStreaming) {
    return (
      <EmptyState>
        <div className="text-muted">
          <span className="stream-cursor">Thinking</span>
        </div>
      </EmptyState>
    );
  }

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto rounded-2xl border border-border bg-surface p-6 sm:p-8">
      {explanation?.summary && (
        <Section label="Summary">
          <p className="text-lg leading-relaxed text-foreground">
            {explanation.summary}
            {isStreaming && !explanation.walkthrough?.length ? (
              <span className="stream-cursor" />
            ) : null}
          </p>
        </Section>
      )}

      {explanation?.walkthrough && explanation.walkthrough.length > 0 && (
        <Section label="Walkthrough">
          <ol className="flex flex-col gap-4">
            {explanation.walkthrough.map((step, index) => (
              <li
                key={index}
                className="animate-slide-up border-l-2 border-accent-violet/60 pl-4"
              >
                <div className="font-mono text-xs uppercase tracking-[0.14em] text-accent-cyan">
                  {step?.anchor || ""}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                  {step?.explanation || ""}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {explanation?.complexity && (
        <Section label="Complexity">
          <div className="grid grid-cols-2 gap-3">
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
            <p className="mt-3 text-sm text-muted">
              {explanation.complexity.notes}
            </p>
          )}
        </Section>
      )}

      {explanation?.risks && explanation.risks.length > 0 && (
        <Section label="Risks">
          <ul className="flex flex-col gap-3">
            {explanation.risks.map((risk, index) =>
              risk ? <RiskItem key={index} risk={risk} /> : null,
            )}
          </ul>
        </Section>
      )}

      {explanation?.tests_to_write && explanation.tests_to_write.length > 0 && (
        <Section label="Tests to write">
          <ul className="flex flex-col gap-2">
            {explanation.tests_to_write.map((test, index) => (
              <li
                key={index}
                className="flex gap-3 text-sm text-foreground/90 animate-slide-up"
              >
                <span className="font-mono text-accent-cyan">
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
    <div className="flex h-full min-h-[24rem] items-center justify-center rounded-2xl border border-dashed border-border bg-surface/50 p-10 text-center text-sm">
      {children}
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="animate-slide-up">
      <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted">
        {label}
      </div>
      {children}
    </section>
  );
}

function ComplexityTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface-2 px-4 py-3">
      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
        {label}
      </div>
      <div className="mt-1 font-mono text-lg text-foreground">{value}</div>
    </div>
  );
}

const SEVERITY_STYLES: Record<string, { border: string; dot: string; label: string }> = {
  high: {
    border: "border-danger/50",
    dot: "bg-danger",
    label: "text-danger",
  },
  medium: {
    border: "border-accent-violet/50",
    dot: "bg-accent-violet",
    label: "text-accent-violet",
  },
  low: {
    border: "border-muted-2/40",
    dot: "bg-muted-2",
    label: "text-muted",
  },
};

function RiskItem({
  risk,
}: {
  risk: DeepPartial<CodeExplanation["risks"][number]>;
}) {
  const severity = (risk?.severity ?? "low").toLowerCase();
  const style = SEVERITY_STYLES[severity] ?? SEVERITY_STYLES.low;
  return (
    <li
      className={`animate-slide-up rounded-xl border bg-surface-2 p-4 ${style.border}`}
    >
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${style.dot}`} />
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${style.label}`}
        >
          {severity}
        </span>
      </div>
      <div className="mt-2 text-sm font-medium text-foreground">
        {risk?.title || ""}
      </div>
      {risk?.detail && (
        <p className="mt-1 text-sm text-muted">{risk.detail}</p>
      )}
    </li>
  );
}
