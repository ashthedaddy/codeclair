"use client";

interface CodeInputProps {
  code: string;
  onCodeChange: (code: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  isPristine: boolean;
  onClearSample: () => void;
}

export function CodeInput({
  code,
  onCodeChange,
  onAnalyze,
  isLoading,
  isPristine,
  onClearSample,
}: CodeInputProps) {
  const charCount = code.length;
  const tooShort = charCount < 20;

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor="code-input"
          className="text-xs font-medium uppercase tracking-[0.18em] text-muted"
        >
          Paste code
        </label>
        {isPristine && (
          <button
            type="button"
            onClick={onClearSample}
            className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted transition hover:text-foreground"
          >
            Sample loaded — clear & paste yours
          </button>
        )}
      </div>
      <div className="relative flex-1 min-h-[24rem] rounded-2xl border border-border bg-surface focus-within:border-accent-violet">
        <textarea
          id="code-input"
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          spellCheck={false}
          className="h-full min-h-[24rem] w-full resize-none rounded-2xl bg-transparent p-5 font-mono text-[13px] leading-relaxed text-foreground placeholder:text-muted-2 focus:outline-none"
          placeholder="// paste any function, component, query, or script..."
        />
        <span className="pointer-events-none absolute bottom-3 right-4 text-xs text-muted-2">
          {charCount.toLocaleString()} chars
        </span>
      </div>
      <button
        type="button"
        onClick={onAnalyze}
        disabled={isLoading || tooShort}
        className={`relative w-full rounded-2xl px-6 py-4 text-base font-semibold text-foreground transition disabled:cursor-not-allowed disabled:opacity-50 ${
          isLoading ? "shimmer" : "bg-gradient-to-r from-accent-violet to-accent-cyan hover:brightness-110"
        }`}
      >
        {isLoading ? "Explaining…" : "Explain →"}
      </button>
    </div>
  );
}
