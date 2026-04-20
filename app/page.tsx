"use client";

import { useCallback, useState } from "react";

import { About } from "@/components/About";
import { Gallery } from "@/components/Gallery";
import { Header, type HeaderPage } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LuxCursor } from "@/components/LuxCursor";
import { ShareModal } from "@/components/ShareModal";
import { Tool } from "@/components/Tool";
import { t } from "@/lib/i18n";
import type { Language } from "@/lib/systemPrompt";

export default function Home() {
  const [page, setPage] = useState<HeaderPage>("home");
  const [language, setLanguage] = useState<Language>("en");
  const [shareOpen, setShareOpen] = useState(false);
  const s = t(language).footer;

  const scrollToTool = useCallback(() => {
    document.getElementById("tool")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleOpenSample = useCallback(() => {
    setPage("home");
    requestAnimationFrame(() => scrollToTool());
  }, [scrollToTool]);

  return (
    <>
      <LuxCursor />
      <Header page={page} onNav={setPage} language={language} onLangChange={setLanguage} />

      {page === "home" && (
        <>
          <Hero onTryIt={scrollToTool} language={language} />
          <Tool language={language} onShareClick={() => setShareOpen(true)} />
        </>
      )}

      {page === "gallery" && <Gallery onOpenSample={handleOpenSample} language={language} />}

      {page === "about" && <About language={language} />}

      <footer className="footer">
        <span>
          codeclair <span className="sep">/</span> {s.left}
        </span>
        <span>{s.right}</span>
      </footer>

      {shareOpen && <ShareModal onClose={() => setShareOpen(false)} language={language} />}
    </>
  );
}
