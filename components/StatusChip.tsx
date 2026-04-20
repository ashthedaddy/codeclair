import type { CSSProperties } from "react";

type Tone = "accent" | "success" | "danger";

interface StatusChipProps {
  tone?: Tone;
  label: string;
  value?: string;
  breathing?: boolean;
}

export function StatusChip({
  tone = "accent",
  label,
  value,
  breathing = true,
}: StatusChipProps) {
  const color: CSSProperties["color"] =
    tone === "success" ? "var(--success)"
    : tone === "danger" ? "var(--danger)"
    : "var(--accent)";
  return (
    <span className="chip" data-tone={tone}>
      {breathing ? <span className="ping" /> : <span className="dot" />}
      <span style={{ color }}>{label}</span>
      {value && (
        <>
          <span style={{ width: 1, height: 10, background: "var(--border-strong)" }} />
          <span style={{ color: "var(--muted-2)" }}>{value}</span>
        </>
      )}
    </span>
  );
}
