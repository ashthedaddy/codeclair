"use client";

import { useCallback, useState } from "react";

import { CodeInput } from "@/components/CodeInput";
import { ExplanationCard } from "@/components/ExplanationCard";
import { Header } from "@/components/Header";
import { SAMPLE_CODE_USE_DEBOUNCE } from "@/lib/samples";
import type { Language } from "@/lib/systemPrompt";
import { useCodeExplanation } from "@/lib/useCodeExplanation";

export default function Home() {
  const [code, setCode] = useState(SAMPLE_CODE_USE_DEBOUNCE);
  const [language, setLanguage] = useState<Language>("en");
  const [isPristine, setIsPristine] = useState(true);

  const { explanation, isStreaming, error, analyze } = useCodeExplanation();

  const handleCodeChange = useCallback(
    (next: string) => {
      setCode(next);
      if (isPristine) setIsPristine(false);
    },
    [isPristine],
  );

  const handleClearSample = useCallback(() => {
    setCode("");
    setIsPristine(false);
  }, []);

  const handleAnalyze = useCallback(() => {
    analyze({ code, language });
  }, [analyze, code, language]);

  const handleLanguageChange = useCallback(
    (next: Language) => {
      setLanguage(next);
      if (explanation && !isStreaming && code.trim().length >= 20) {
        analyze({ code, language: next });
      }
    },
    [analyze, code, explanation, isStreaming],
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header language={language} onLanguageChange={handleLanguageChange} />
      <main className="flex flex-1 flex-col gap-6 px-6 py-8 sm:px-10 sm:py-10 lg:flex-row lg:gap-8">
        <section className="flex flex-col lg:w-1/2">
          <CodeInput
            code={code}
            onCodeChange={handleCodeChange}
            onAnalyze={handleAnalyze}
            isLoading={isStreaming}
            isPristine={isPristine}
            onClearSample={handleClearSample}
          />
        </section>
        <section className="flex flex-col lg:w-1/2">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Explanation
            </span>
            {isStreaming && (
              <span className="text-xs text-accent-cyan">streaming…</span>
            )}
          </div>
          <div className="flex-1">
            <ExplanationCard
              explanation={explanation}
              isStreaming={isStreaming}
              error={error}
            />
          </div>
        </section>
      </main>
      <footer className="border-t border-border px-6 py-5 text-xs text-muted sm:px-10">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <span>
            codeclair · <span className="text-muted-2">Mtl</span>
          </span>
          <span className="text-muted-2">
            Claude Sonnet 4.6 · AI SDK v6 · Next.js 16
          </span>
        </div>
      </footer>
    </div>
  );
}
