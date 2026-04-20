"use client";

import { useState, type CSSProperties } from "react";

import { useCardGlow } from "@/components/lux";
import { GALLERY, type GalleryItem } from "@/lib/gallery";
import { t } from "@/lib/i18n";
import type { Language } from "@/lib/systemPrompt";

interface GalleryProps {
  onOpenSample: (item: GalleryItem) => void;
  language: Language;
}

const TAGS = ["all", "ts", "py", "sql", "go", "rust", "next", "js", "css"];

export function Gallery({ onOpenSample, language }: GalleryProps) {
  const s = t(language).gallery;
  const [filter, setFilter] = useState("all");

  const filtered = GALLERY.filter((g) => {
    if (filter === "all") return true;
    return g.tag.toLowerCase().startsWith(filter);
  });

  return (
    <div>
      <section className="gallery-hero">
        <div className="meta-row">
          <span className="tick" />
          <span>{s.dossier}</span>
          <span>·</span>
          <span>{s.archive}</span>
        </div>
        <h1>
          {s.titleBefore}
          <em style={{ color: "var(--accent)", fontStyle: "italic" }}>{s.titleEm}</em>
          {s.titleAfter}
        </h1>
        <p>{s.dek}</p>

        <div className="gallery-filters">
          <span className="kicker" style={{ alignSelf: "center", marginRight: 6 }}>{s.filter}</span>
          {TAGS.map((tag) => (
            <button
              key={tag}
              className="chip-sample"
              aria-pressed={filter === tag}
              onClick={() => setFilter(tag)}
              style={{
                textTransform: "uppercase",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <section className="gallery-grid">
        {filtered.map((g, i) => (
          <GalleryCard key={g.id} g={g} i={i} onClick={() => onOpenSample(g)} />
        ))}
      </section>
    </div>
  );
}

function GalleryCard({
  g,
  i,
  onClick,
}: {
  g: GalleryItem;
  i: number;
  onClick: () => void;
}) {
  const ref = useCardGlow<HTMLElement>();
  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className="g-card slide-up"
      style={{ ["--i" as string]: i } as CSSProperties}
      onClick={onClick}
    >
      <span className="gc-tag">{g.tag}</span>
      <h3 className="gc-title">{g.title}</h3>
      <p className="gc-sum">{g.summary}</p>
      <div className="gc-foot">
        <span className="gc-stats">
          <strong>{g.time}</strong> · <strong>{g.risks}</strong> risks
        </span>
        <span className="gc-sig">
          <span style={{ color: g.lang === "fr" ? "oklch(0.72 0.13 275)" : "var(--accent)" }}>
            {g.lang.toUpperCase()}
          </span>
          <span>·</span>
          <span>{g.date}</span>
        </span>
      </div>
    </article>
  );
}
