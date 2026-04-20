"use client";

import { useCallback, useState } from "react";

import { About } from "@/components/About";
import { Gallery } from "@/components/Gallery";
import { Header, type HeaderPage } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LuxCursor } from "@/components/LuxCursor";
import { ShareModal } from "@/components/ShareModal";
import { Tool } from "@/components/Tool";
import type { Language } from "@/lib/systemPrompt";

export default function Home() {
  const [page, setPage] = useState<HeaderPage>("home");
  const [language, setLanguage] = useState<Language>("en");
  const [shareOpen, setShareOpen] = useState(false);

  const scrollToTool = useCallback(() => {
    document.getElementById("tool")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleOpenSample = useCallback(() => {
    setPage("home");
    // wait for render before scrolling
    requestAnimationFrame(() => scrollToTool());
  }, [scrollToTool]);

  return (
    <>
      <LuxCursor />
      <Header
        page={page}
        onNav={setPage}
        language={language}
        onLangChange={setLanguage}
      />

      {page === "home" && (
        <>
          <Hero onTryIt={scrollToTool} />
          <Tool language={language} onShareClick={() => setShareOpen(true)} />
        </>
      )}

      {page === "gallery" && <Gallery onOpenSample={handleOpenSample} />}

      {page === "about" && <About />}

      <footer className="footer">
        <span>
          codeclair <span className="sep">/</span> Mtl
        </span>
        <span>
          AI SDK v6 <span className="sep">·</span> Next.js 16{" "}
          <span className="sep">·</span> Fluid Compute
        </span>
      </footer>

      {shareOpen && <ShareModal onClose={() => setShareOpen(false)} />}
    </>
  );
}
