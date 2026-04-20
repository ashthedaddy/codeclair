"use client";

export type CodeLang = "ts" | "py" | "sql" | "go";

interface Tok { cls: string; text: string }
interface Line { lead: string; parts: Tok[] }

const KW: Record<CodeLang, RegExp> = {
  ts: /\b(import|from|export|function|const|let|var|return|if|else|for|while|class|interface|type|extends|implements|new|this|async|await|try|catch|finally|throw|null|undefined|true|false)\b/g,
  py: /\b(def|return|if|elif|else|for|while|in|not|and|or|import|from|as|class|try|except|finally|raise|None|True|False|with|lambda|pass|yield)\b/g,
  sql: /\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP|BY|HAVING|ORDER|LIMIT|AS|AND|OR|NOT|NULL|COUNT|SUM|AVG|INTERVAL|NOW|DISTINCT)\b/g,
  go: /\b(func|package|import|return|if|else|for|range|switch|case|default|defer|go|select|chan|var|const|type|struct|interface|map|nil|true|false)\b/g,
};

function highlight(segment: string, kw: RegExp): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < segment.length) {
    const sub = segment.slice(i);

    let m = sub.match(/^("([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`)/);
    if (m) { out.push({ cls: "tok-str", text: m[0] }); i += m[0].length; continue; }

    m = sub.match(/^\d+(\.\d+)?/);
    if (m) { out.push({ cls: "tok-num", text: m[0] }); i += m[0].length; continue; }

    const kwre = new RegExp("^" + kw.source.replace(/\\b/g, ""));
    m = sub.match(kwre);
    if (m && /^[A-Za-z_]/.test(m[0]) && /\b/.test(segment[i + m[0].length] || " ")) {
      out.push({ cls: "tok-key", text: m[0] });
      i += m[0].length;
      continue;
    }

    m = sub.match(/^[A-Za-z_][A-Za-z0-9_]*/);
    if (m) {
      const next = segment[i + m[0].length];
      const cls = next === "(" ? "tok-fn" : "";
      out.push({ cls, text: m[0] });
      i += m[0].length;
      continue;
    }

    out.push({ cls: "", text: segment[i] });
    i++;
  }
  const merged: Tok[] = [];
  for (const p of out) {
    const last = merged[merged.length - 1];
    if (last && last.cls === p.cls) last.text += p.text;
    else merged.push({ ...p });
  }
  return merged;
}

function tokenize(code: string, lang: CodeLang): Line[] {
  const lines = code.split("\n");
  const kw = KW[lang] || KW.ts;
  return lines.map((line) => {
    const leadMatch = line.match(/^\s*/);
    const lead = leadMatch ? leadMatch[0] : "";
    const rest = line.slice(lead.length);

    const cm = rest.match(/(\/\/.*$|#.*$|--.*$)/);
    if (cm && cm.index !== undefined) {
      const before = rest.slice(0, cm.index);
      const comment = cm[0];
      const parts: Tok[] = [];
      if (before) parts.push(...highlight(before, kw));
      parts.push({ cls: "tok-com", text: comment });
      return { lead, parts };
    }
    return { lead, parts: highlight(rest, kw) };
  });
}

interface CodeBlockProps {
  code: string;
  lang: CodeLang;
  activeLines?: [number, number] | null;
  onHoverLine?: (ln: number | null) => void;
}

export function CodeBlock({ code, lang, activeLines, onHoverLine }: CodeBlockProps) {
  const toks = tokenize(code, lang);
  return (
    <div className="code-pretty">
      <div className="linenos" aria-hidden>
        {toks.map((_, i) => <div key={i}>{String(i + 1).padStart(2, "0")}</div>)}
      </div>
      {toks.map((line, i) => {
        const ln = i + 1;
        const active = activeLines && ln >= activeLines[0] && ln <= activeLines[1];
        return (
          <div
            key={i}
            className="code-line"
            data-active={active ? "true" : "false"}
            onMouseEnter={() => onHoverLine?.(ln)}
            onMouseLeave={() => onHoverLine?.(null)}
          >
            <span style={{ whiteSpace: "pre" }}>{line.lead}</span>
            {line.parts.map((p, pi) => (
              <span key={pi} className={p.cls}>{p.text}</span>
            ))}
            {line.parts.length === 0 && line.lead.length === 0 && <span>&nbsp;</span>}
          </div>
        );
      })}
    </div>
  );
}
