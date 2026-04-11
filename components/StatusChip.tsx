"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Tone = "accent" | "success" | "danger" | "muted";

interface StatusChipProps {
  tone?: Tone;
  label: string;
  value?: string;
  breathing?: boolean;
  className?: string;
  children?: ReactNode;
}

const TONE_DOT: Record<Tone, string> = {
  accent: "bg-accent",
  success: "bg-success",
  danger: "bg-danger",
  muted: "bg-muted-2",
};

const TONE_LABEL: Record<Tone, string> = {
  accent: "text-accent",
  success: "text-success",
  danger: "text-danger",
  muted: "text-muted",
};

export function StatusChip({
  tone = "accent",
  label,
  value,
  breathing = true,
  className = "",
  children,
}: StatusChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className={[
        "inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 px-3 py-1.5 backdrop-blur-md",
        "font-mono text-[10px] uppercase tracking-[0.2em]",
        className,
      ].join(" ")}
    >
      <span className="relative inline-flex h-1.5 w-1.5">
        <span
          className={`absolute inset-0 rounded-full ${TONE_DOT[tone]} ${
            breathing ? "breathe" : ""
          }`}
        />
        {breathing && (
          <span
            className={`absolute inset-0 rounded-full ${TONE_DOT[tone]} opacity-30 animate-ping`}
          />
        )}
      </span>
      <span className={TONE_LABEL[tone]}>{label}</span>
      {value && (
        <>
          <span className="h-3 w-px bg-border" />
          <span className="text-muted-2">{value}</span>
        </>
      )}
      {children}
    </motion.div>
  );
}
