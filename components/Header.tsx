"use client";

import { t } from "@/lib/i18n";
import type { Language } from "@/lib/systemPrompt";

export type HeaderPage = "home" | "gallery" | "about";

interface HeaderProps {
  page: HeaderPage;
  onNav: (page: HeaderPage) => void;
  language: Language;
  onLangChange: (language: Language) => void;
}

export function Header({ page, onNav, language, onLangChange }: HeaderProps) {
  const s = t(language).nav;
  return (
    <header className="header">
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <a
          className="wordmark"
          href="#home"
          onClick={(e) => { e.preventDefault(); onNav("home"); }}
        >
          <span>codeclair</span>
          <span className="dot breathe" />
        </a>
        <div style={{ width: 1, height: 20, background: "var(--border)" }} />
        <nav style={{ display: "flex", gap: 4 }}>
          <a className="nav-link" data-active={page === "home"} href="#"
             onClick={(e) => { e.preventDefault(); onNav("home"); }}>{s.reader}</a>
          <a className="nav-link" data-active={page === "gallery"} href="#"
             onClick={(e) => { e.preventDefault(); onNav("gallery"); }}>{s.examples}</a>
          <a className="nav-link" data-active={page === "about"} href="#"
             onClick={(e) => { e.preventDefault(); onNav("about"); }}>{s.dossier}</a>
        </nav>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div className="lang-toggle" role="group" aria-label="Output language">
          <span
            className="lang-thumb"
            style={{
              left: 4,
              transform: language === "en" ? "translateX(0)" : "translateX(calc(100% + 4px))",
            }}
          />
          <button className="lang-pill" aria-pressed={language === "en"} onClick={() => onLangChange("en")}>EN</button>
          <button className="lang-pill" aria-pressed={language === "fr"} onClick={() => onLangChange("fr")}>FR</button>
        </div>
      </div>
    </header>
  );
}
