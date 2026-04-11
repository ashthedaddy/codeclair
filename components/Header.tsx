"use client";

import type { Language } from "@/lib/systemPrompt";

interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-5 sm:px-10">
      <a
        href="/"
        className="font-serif text-2xl leading-none tracking-tight sm:text-3xl"
      >
        <span className="gradient-text">codeclair</span>
      </a>
      <div
        role="group"
        aria-label="Output language"
        className="flex items-center gap-0.5 rounded-full border border-border bg-surface p-1 text-sm font-medium"
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
    </header>
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
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-w-[2.75rem] rounded-full px-3 py-1.5 transition ${
        active
          ? "bg-surface-2 text-foreground shadow-[0_0_0_1px_var(--border)]"
          : "text-muted hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}
