"use client";

import { motion, useInView } from "motion/react";
import { useCallback, useRef, useState } from "react";

import { CodeInput } from "@/components/CodeInput";
import { ExplanationCard } from "@/components/ExplanationCard";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SampleChips } from "@/components/SampleChips";
import { StatusChip } from "@/components/StatusChip";
import { SAMPLES, getSample, type SampleId } from "@/lib/samples";
import type { Language } from "@/lib/systemPrompt";
import { useCodeExplanation } from "@/lib/useCodeExplanation";

export default function Home() {
  const [code, setCode] = useState(SAMPLES[0].code);
  const [activeSampleId, setActiveSampleId] = useState<SampleId | null>(
    SAMPLES[0].id,
  );
  const [language, setLanguage] = useState<Language>("en");

  const { explanation, isStreaming, error, analyze } = useCodeExplanation();

  const toolRef = useRef<HTMLElement>(null);
  const toolInView = useInView(toolRef, { once: true, amount: 0.2 });

  const handleCodeChange = useCallback((next: string) => {
    setCode(next);
    setActiveSampleId(null);
  }, []);

  const handleSampleSelect = useCallback((id: SampleId) => {
    const sample = getSample(id);
    setCode(sample.code);
    setActiveSampleId(id);
  }, []);

  const handleAnalyze = useCallback(() => {
    analyze({ code, language });
  }, [analyze, code, language]);

  const handleLanguageChange = useCallback(
    (next: Language) => {
      if (next === language) return;
      setLanguage(next);
      if (code.trim().length >= 20) {
        analyze({ code, language: next });
      }
    },
    [analyze, code, language],
  );

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header language={language} onLanguageChange={handleLanguageChange} />
      <Hero />
      <motion.main
        ref={toolRef}
        id="tool"
        initial={{ opacity: 0, y: 32 }}
        animate={toolInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex w-full max-w-[1400px] flex-1 scroll-mt-6 flex-col gap-6 px-6 py-10 sm:px-10 sm:py-14 lg:flex-row lg:gap-8"
      >
        <section className="flex flex-col lg:w-1/2">
          <div className="mb-4">
            <SampleChips
              activeSampleId={activeSampleId}
              onSelect={handleSampleSelect}
            />
          </div>
          <CodeInput
            code={code}
            onCodeChange={handleCodeChange}
            onAnalyze={handleAnalyze}
            isLoading={isStreaming}
          />
        </section>
        <section className="flex flex-col lg:w-1/2">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-2">
              Output · explanation
            </span>
            {isStreaming && <StatusChip tone="accent" label="streaming" />}
          </div>
          <div className="flex-1">
            <ExplanationCard
              explanation={explanation}
              isStreaming={isStreaming}
              error={error}
            />
          </div>
        </section>
      </motion.main>
      <footer className="mx-auto w-full max-w-[1400px] border-t border-border px-6 py-6 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2 sm:flex-row sm:items-center">
          <span>
            codeclair <span className="mx-2 text-border-strong">/</span> Mtl
          </span>
          <span>Claude Sonnet 4.6 · AI SDK v6 · Next.js 16</span>
        </div>
      </footer>
    </div>
  );
}
