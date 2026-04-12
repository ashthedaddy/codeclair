"use client";

import { motion } from "motion/react";
import { CommandChip } from "@/components/CommandChip";
import { StatusChip } from "@/components/StatusChip";
import type { Language } from "@/lib/systemPrompt";

interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/70 px-6 py-4 backdrop-blur-xl sm:px-10"
    >
      <div className="flex items-center gap-5">
        <a
          href="/"
          className="group flex items-baseline gap-2 leading-none"
          aria-label="codeclair — home"
        >
          <span className="font-serif text-[26px] tracking-tight text-foreground sm:text-[28px]">
            codeclair
          </span>
          <span className="h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-accent breathe" />
        </a>
        <span className="hidden h-5 w-px bg-border md:block" />
        <CommandChip />
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block">
          <StatusChip tone="success" label="live" value="streaming" />
        </div>

        <div
          role="group"
          aria-label="Output language"
          className="flex items-center gap-0.5 rounded-full border border-border bg-surface p-1"
        >
          <LanguagePill
            label="EN"
            active={language === "en"}
            onClick={() => onLanguageChange("en")}
          />
          <LanguagePill
            label="FR"
            active={language === "fr"}
            onClick={() => onLanguageChange("fr")}
          />
        </div>
      </div>
    </motion.header>
  );
}

function LanguagePill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`relative min-w-[2.75rem] rounded-full px-3.5 py-1.5 font-mono text-[13px] tracking-tight transition-colors ${
        active ? "text-background" : "text-muted hover:text-foreground"
      }`}
    >
      {active && (
        <motion.span
          layoutId="lang-pill"
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="absolute inset-0 rounded-full bg-accent"
        />
      )}
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}
