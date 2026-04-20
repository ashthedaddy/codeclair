import { t } from "@/lib/i18n";
import type { Language } from "@/lib/systemPrompt";

export function About({ language }: { language: Language }) {
  const s = t(language).about;
  return (
    <div>
      <section className="about-hero">
        <div className="brow">{s.brow}</div>
        <h1>
          {s.titleBefore}<em>{s.titleEm}</em>
        </h1>
        <p className="lede">{s.lede}</p>
      </section>

      <article className="about-body">
        <p>{s.p1}</p>
        <p>{s.p2}</p>

        <h2><span className="n">01</span>{s.h1}</h2>
        <p>{s.tells}</p>

        <div className="badrow">
          <div>
            <span className="tag">{s.badA1tag}</span>
            <div><em>{s.badA1line}</em></div>
            <div style={{ marginTop: 6, color: "var(--muted)" }}>{s.badA1note}</div>
          </div>
          <div>
            <span className="tag">{s.badB1tag}</span>
            <div><em>{s.badB1line}</em></div>
            <div style={{ marginTop: 6, color: "var(--muted)" }}>{s.badB1note}</div>
          </div>
        </div>

        <div className="badrow">
          <div>
            <span className="tag">{s.badA2tag}</span>
            <div>{s.badA2line}</div>
            <div style={{ marginTop: 6, color: "var(--muted)" }}>{s.badA2note}</div>
          </div>
          <div>
            <span className="tag">{s.badB2tag}</span>
            <div>{s.badB2line}</div>
            <div style={{ marginTop: 6, color: "var(--muted)" }}>{s.badB2note}</div>
          </div>
        </div>

        <div className="pull">{s.pull}</div>

        <h2><span className="n">02</span>{s.h2}</h2>
        <p>{s.enforce1}</p>
        <p>
          {s.enforce2a}
          <code style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--accent)" }}>courriel</code>,{" "}
          <code style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--accent)" }}>nous vous prions</code>,{" "}
          <code style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--accent)" }}>veuillez agréer</code>
          {s.enforce2b}
        </p>

        <h2><span className="n">03</span>{s.h3}</h2>
        <p>{s.portfolio1}</p>
        <p>{s.portfolio2}</p>

        <div
          style={{
            marginTop: 64,
            paddingTop: 24,
            borderTop: "1px solid var(--border)",
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            fontFamily: "var(--mono)",
            fontSize: 12,
            color: "var(--muted-2)",
          }}
        >
          <span>{s.sig}</span>
          <span style={{ color: "var(--muted-3)" }}>/</span>
          <a href="mailto:arshiahamidi88@yahoo.com" style={{ color: "var(--muted)" }}>
            arshiahamidi88@yahoo.com
          </a>
          <a href="https://linkedin.com/in/arshiahamidi" target="_blank" rel="noreferrer" style={{ color: "var(--muted)" }}>
            LinkedIn
          </a>
          <a href="https://github.com/ashthedaddy" target="_blank" rel="noreferrer" style={{ color: "var(--muted)" }}>
            GitHub
          </a>
        </div>
      </article>
    </div>
  );
}
