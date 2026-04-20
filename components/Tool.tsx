"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { DeepPartial } from "ai";

import { CodeBlock } from "@/components/CodeBlock";
import { StatusChip } from "@/components/StatusChip";
import { t } from "@/lib/i18n";
import { SAMPLES, type CannedExplanation, type Sample } from "@/lib/samples";
import type { CodeExplanation } from "@/lib/schema";
import type { Language } from "@/lib/systemPrompt";
import { useCodeExplanation } from "@/lib/useCodeExplanation";

interface ToolProps {
  language: Language;
  onShareClick: () => void;
}

function Kicker({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return <span className="kicker" style={style}>{children}</span>;
}

function ArrowIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 7h8" /><path d="M7.5 3.5L11 7l-3.5 3.5" />
    </svg>
  );
}

export function Tool({ language, onShareClick }: ToolProps) {
  const s = t(language).tool;
  const [activeSampleId, setActiveSampleId] = useState<string>("useDebounce");
  const sample: Sample = useMemo(
    () => SAMPLES.find((x) => x.id === activeSampleId) || SAMPLES[0],
    [activeSampleId],
  );
  const [code, setCode] = useState(sample.code);
  const [showDiff, setShowDiff] = useState(false);

  const { explanation, isStreaming, error, analyze } = useCodeExplanation();

  useEffect(() => { setCode(sample.code); }, [sample]);

  useEffect(() => {
    if (code.trim().length >= 20) analyze({ code, language });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const handleExplain = () => {
    if (code.trim().length >= 20) analyze({ code, language });
  };

  const hasExplanation = explanation && !!explanation.summary;
  const showEmpty = !hasExplanation && !isStreaming && !error;

  return (
    <section className="main" id="tool">
      <div className="col-head" style={{ justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <Kicker>{s.section}</Kicker>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 36, margin: "6px 0 0", letterSpacing: "-0.02em" }}>
            {s.title}
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            className="btn btn-secondary btn-sm"
            aria-pressed={showDiff}
            onClick={() => setShowDiff(!showDiff)}
            style={showDiff ? { borderColor: "var(--accent)", color: "var(--accent)" } : {}}
          >
            {s.diff}
          </button>
          <button className="btn btn-secondary btn-sm" onClick={onShareClick}>
            {s.share}
          </button>
        </div>
      </div>

      <div className="tool" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <section>
          <div style={{ marginBottom: 14, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <span className="kicker" style={{ marginRight: 6 }}>{s.try}</span>
            {SAMPLES.map((x) => (
              <button
                key={x.id}
                className="chip-sample"
                aria-pressed={x.id === activeSampleId}
                onClick={() => setActiveSampleId(x.id)}
              >
                <span className="chip-tag">{x.tag}</span>
                <span>{x.label}</span>
              </button>
            ))}
          </div>

          <div className="col-head">
            <Kicker>{s.input} · {sample.filename}</Kicker>
            <span className="char-count">{code.length.toLocaleString()} {s.chars}</span>
          </div>

          <div className="code-frame" style={{ position: "relative" }}>
            <div className="code-head">
              <span className="dots"><span /><span /><span /></span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted-2)" }}>
                {sample.filename}
              </span>
              <span style={{ width: 40 }} />
            </div>
            <CodeBlock code={code} lang={sample.lang} />
          </div>

          <button
            className="btn btn-primary btn-lg"
            style={{ marginTop: 14, width: "100%", justifyContent: "center" }}
            onClick={handleExplain}
            disabled={isStreaming}
          >
            {s.explain} <ArrowIcon />
          </button>
        </section>

        <section>
          <div className="col-head">
            <Kicker>{s.outputKicker}</Kicker>
            {isStreaming && <StatusChip tone="accent" label={s.streaming} />}
            {!isStreaming && hasExplanation && !error && (
              <StatusChip
                tone="success"
                label={s.done}
                value={`${explanation?.walkthrough?.length ?? 0} ${s.steps}`}
                breathing={false}
              />
            )}
            {error && <StatusChip tone="danger" label={s.error} breathing={false} />}
          </div>

          {error && (
            <div className="card empty">
              <div className="inner">
                <div className="kicker" style={{ color: "var(--danger)" }}>{s.errorKicker}</div>
                <div style={{ marginTop: 10, color: "var(--fg-soft)" }}>{error}</div>
              </div>
            </div>
          )}

          {showEmpty && !error && (
            <div className="card empty">
              <div className="inner">
                {s.empty.pre}
                <span style={{ color: "var(--fg)" }}>{s.empty.explain}</span>
                {s.empty.post}
              </div>
            </div>
          )}

          {hasExplanation && !error && !showDiff && (
            <LiveOutput explanation={explanation!} streaming={isStreaming} language={language} />
          )}

          {showDiff && !error && (
            <DiffOutput sample={sample} language={language} />
          )}
        </section>
      </div>
    </section>
  );
}

function LiveOutput({
  explanation,
  streaming,
  language,
}: {
  explanation: DeepPartial<CodeExplanation>;
  streaming: boolean;
  language: Language;
}) {
  const s = t(language).tool;
  const walk = (explanation.walkthrough ?? []).filter(Boolean);
  const risks = (explanation.risks ?? []).filter(Boolean);
  const tests = (explanation.tests_to_write ?? []).filter(Boolean);

  return (
    <div className="card" style={{ padding: 0 }}>
      <div className="out-body">
        <section className="slide-up" style={{ ["--i" as string]: 0 } as CSSProperties}>
          <div className="section-head">
            <span className="section-idx">S · 01</span>
            <h3 className="section-title">{s.sec.summary}</h3>
          </div>
          <p className="summary">
            {explanation.summary}
            {streaming && <span className="caret" />}
          </p>
        </section>

        {walk.length > 0 && (
          <section className="slide-up" style={{ ["--i" as string]: 1 } as CSSProperties}>
            <div className="section-head">
              <span className="section-idx">S · 02</span>
              <h3 className="section-title">{s.sec.walkthrough}</h3>
              <span className="section-meta">{walk.length} {s.stepsMeta}</span>
            </div>
            <ol className="walkthrough">
              {walk.map((st, i) => (
                <li
                  key={i}
                  className="walk-step slide-up"
                  style={{ ["--i" as string]: i + 1 } as CSSProperties}
                >
                  <div className="walk-anchor">{st?.anchor}</div>
                  <div className="walk-exp">{st?.explanation}</div>
                  <div className="walk-lines">{String(i + 1).padStart(2, "0")}</div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {explanation.complexity && (
          <section className="slide-up" style={{ ["--i" as string]: 2 } as CSSProperties}>
            <div className="section-head">
              <span className="section-idx">S · 03</span>
              <h3 className="section-title">{s.sec.complexity}</h3>
            </div>
            <div className="complex-grid">
              <div className="complex-cell"><div className="k">{s.timeLabel}</div><div className="v">{explanation.complexity.time}</div></div>
              <div className="complex-cell"><div className="k">{s.spaceLabel}</div><div className="v">{explanation.complexity.space}</div></div>
            </div>
            <p className="complex-notes">{explanation.complexity.notes}</p>
          </section>
        )}

        {risks.length > 0 && (
          <section className="slide-up" style={{ ["--i" as string]: 3 } as CSSProperties}>
            <div className="section-head">
              <span className="section-idx">S · 04</span>
              <h3 className="section-title">{s.sec.risks}</h3>
              <span className="section-meta">{risks.length} {s.noted}</span>
            </div>
            <ul className="risks">
              {risks.map((r, i) => {
                const sev = (r?.severity ?? "low") as string;
                return (
                  <li key={i} className="risk-row">
                    <div className="risk-head">
                      <span className={`sev-dot sev-${sev}`} />
                      <span className={`risk-sev sev-t-${sev}`}>{sev}</span>
                    </div>
                    <div className="risk-title">{r?.title}</div>
                    <div className="risk-detail">{r?.detail}</div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {tests.length > 0 && (
          <section className="slide-up" style={{ ["--i" as string]: 4 } as CSSProperties}>
            <div className="section-head">
              <span className="section-idx">S · 05</span>
              <h3 className="section-title">{s.sec.tests}</h3>
            </div>
            <ul className="tests">
              {tests.map((ts, i) => (
                <li key={i}>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <span>{ts}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

function DiffOutput({ sample, language }: { sample: Sample; language: Language }) {
  const s = t(language).tool;
  const en: CannedExplanation = sample.explanation.en;
  const fr: CannedExplanation = sample.explanation.fr;
  return (
    <div className="card" style={{ padding: 24 }}>
      <div className="diff-pair">
        <div className="diff-col">
          <div className="diff-label en">EN</div>
          <p className="summary">{en.summary}</p>
          <div className="kicker" style={{ marginTop: 16 }}>{s.sec.risks}</div>
          <ul className="risks" style={{ marginTop: 8 }}>
            {en.risks.map((r, i) => (
              <li key={i} className="risk-row">
                <div className="risk-head">
                  <span className={`sev-dot sev-${r.sev}`} />
                  <span className={`risk-sev sev-t-${r.sev}`}>{r.sev}</span>
                </div>
                <div className="risk-title">{r.title}</div>
                <div className="risk-detail">{r.detail}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="diff-col">
          <div className="diff-label fr">FR · QC</div>
          <p className="summary">{fr.summary}</p>
          <div className="kicker" style={{ marginTop: 16, color: "oklch(0.72 0.13 275)" }}>Risques</div>
          <ul className="risks" style={{ marginTop: 8 }}>
            {fr.risks.map((r, i) => (
              <li key={i} className="risk-row">
                <div className="risk-head">
                  <span className={`sev-dot sev-${r.sev}`} />
                  <span className={`risk-sev sev-t-${r.sev}`}>{r.sev}</span>
                </div>
                <div className="risk-title">{r.title}</div>
                <div className="risk-detail">{r.detail}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
