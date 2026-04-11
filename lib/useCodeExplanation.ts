"use client";

import { useCallback, useRef, useState } from "react";
import { parsePartialJson, type DeepPartial } from "ai";

import type { CodeExplanation } from "./schema";
import type { Language } from "./systemPrompt";

interface AnalyzeArgs {
  code: string;
  language: Language;
  regenerate?: boolean;
}

interface AnalyzeError {
  code: string;
  message?: string;
  field?: string;
  retryAfterSec?: number;
}

export interface UseCodeExplanationResult {
  explanation: DeepPartial<CodeExplanation> | null;
  isStreaming: boolean;
  error: string | null;
  analyze: (args: AnalyzeArgs) => Promise<void>;
  cancel: () => void;
}

export function useCodeExplanation(): UseCodeExplanationResult {
  const [explanation, setExplanation] = useState<
    DeepPartial<CodeExplanation> | null
  >(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
  }, []);

  const analyze = useCallback(async (args: AnalyzeArgs) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setExplanation(null);
    setError(null);
    setIsStreaming(true);

    let response: Response;
    try {
      response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(args),
        signal: controller.signal,
      });
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError("Network error — check your connection and try again.");
      setIsStreaming(false);
      return;
    }

    if (!response.ok) {
      let payload: AnalyzeError | null = null;
      try {
        payload = (await response.json()) as AnalyzeError;
      } catch {
        /* ignore */
      }
      setError(formatError(response.status, payload));
      setIsStreaming(false);
      return;
    }

    const body = response.body;
    if (!body) {
      setError("Empty response from server.");
      setIsStreaming(false);
      return;
    }

    const reader = body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const parsed = await parsePartialJson(buffer);
        if (
          parsed.state === "successful-parse" ||
          parsed.state === "repaired-parse"
        ) {
          setExplanation(
            parsed.value as DeepPartial<CodeExplanation> | null,
          );
        }
      }
      buffer += decoder.decode();
      const final = await parsePartialJson(buffer);
      if (final.state === "successful-parse" || final.state === "repaired-parse") {
        setExplanation(final.value as DeepPartial<CodeExplanation> | null);
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError("Stream interrupted — try again.");
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, []);

  return { explanation, isStreaming, error, analyze, cancel };
}

function formatError(status: number, payload: AnalyzeError | null): string {
  if (!payload) return `Request failed (${status}).`;
  switch (payload.code) {
    case "RATE_LIMITED": {
      const min = Math.max(1, Math.ceil((payload.retryAfterSec ?? 60) / 60));
      return `Too many requests — try again in ${min} minute${min === 1 ? "" : "s"}.`;
    }
    case "INVALID_INPUT":
      return payload.field === "code"
        ? "Code is too short or too long. Paste between 20 and 12,000 characters."
        : payload.message || "Invalid input.";
    case "MODEL_ERROR":
      return "AI service error. Try again in a moment.";
    case "CONFIG_ERROR":
      return "Server is missing an API key. Ping the maintainer.";
    default:
      return payload.message || `Request failed (${status}).`;
  }
}
