"use client";

import { useEffect, useState } from "react";

const PROMPTS = [
  "explain this debounce hook",
  "read this SQL in Québec French",
  "find the bug in fib(memo={})",
  "big-O this in one paragraph",
  "what tests would you write?",
];

const TYPE_MS = 45;
const ERASE_MS = 22;
const HOLD_MS = 1600;

export function CommandChip() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"type" | "hold" | "erase">("type");

  useEffect(() => {
    const current = PROMPTS[index];

    if (phase === "type") {
      if (text.length < current.length) {
        const t = window.setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          TYPE_MS,
        );
        return () => window.clearTimeout(t);
      }
      const t = window.setTimeout(() => setPhase("hold"), 30);
      return () => window.clearTimeout(t);
    }

    if (phase === "hold") {
      const t = window.setTimeout(() => setPhase("erase"), HOLD_MS);
      return () => window.clearTimeout(t);
    }

    if (phase === "erase") {
      if (text.length > 0) {
        const t = window.setTimeout(
          () => setText(text.slice(0, -1)),
          ERASE_MS,
        );
        return () => window.clearTimeout(t);
      }
      setIndex((i) => (i + 1) % PROMPTS.length);
      setPhase("type");
    }
  }, [text, phase, index]);

  return (
    <div className="hidden items-center gap-2.5 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-[11px] text-muted backdrop-blur-md md:inline-flex">
      <span className="text-muted-2">{">"}</span>
      <span className="type-caret min-w-[18ch]">{text}</span>
    </div>
  );
}
