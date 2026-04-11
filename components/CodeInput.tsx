"use client";

import { motion } from "motion/react";
import { CTAButton } from "@/components/CTAButton";

interface CodeInputProps {
  code: string;
  onCodeChange: (code: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export function CodeInput({
  code,
  onCodeChange,
  onAnalyze,
  isLoading,
}: CodeInputProps) {
  const charCount = code.length;
  const tooShort = charCount < 20;

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor="code-input"
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-2"
        >
          Input · paste code
        </label>
        <motion.span
          key={charCount}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-2 tabular-nums"
        >
          {charCount.toLocaleString()} chars
        </motion.span>
      </div>
      <div className="group relative flex-1 min-h-[26rem] overflow-hidden rounded-[20px] border border-border bg-surface transition-colors focus-within:border-accent/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 transition-opacity group-focus-within:opacity-100"
        />
        <textarea
          id="code-input"
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          spellCheck={false}
          className="h-full min-h-[26rem] w-full resize-none bg-transparent p-6 font-mono text-[13px] leading-[1.7] text-foreground placeholder:text-muted-2 focus:outline-none"
          placeholder="// paste any function, component, query, or script..."
        />
      </div>
      <CTAButton
        size="lg"
        variant="primary"
        onClick={onAnalyze}
        disabled={tooShort}
        loading={isLoading}
        fullWidth
        trailingIcon={!isLoading && <ArrowIcon />}
      >
        Explain
      </CTAButton>
    </div>
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
