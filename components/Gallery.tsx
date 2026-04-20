"use client";

import { useState, type CSSProperties } from "react";

import { useCardGlow } from "@/components/lux";
import { GALLERY, type GalleryItem } from "@/lib/gallery";

interface GalleryProps {
  onOpenSample: (item: GalleryItem) => void;
}

const TAGS = ["all", "ts", "py", "sql", "go", "rust", "next", "js", "css"];

export function Gallery({ onOpenSample }: GalleryProps) {
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
          <span>Dossier N° 002</span>
          <span>·</span>
          <span>Archive</span>
        </div>
        <h1>
          A library of{" "}
          <em style={{ color: "var(--accent)", fontStyle: "italic" }}>read</em>{" "}
          code.
        </h1>
        <p>
          Every explanation codeclair has produced, permalinked and searchable.
          Browse by language or by the kind of bug that lives in it. Click any
          card to re-open it in the reader.
        </p>

        <div className="gallery-filters">
          <span className="kicker" style={{ alignSelf: "center", marginRight: 6 }}>
            Filter:
          </span>
          {TAGS.map((t) => (
            <button
              key={t}
              className="chip-sample"
              aria-pressed={filter === t}
              onClick={() => setFilter(t)}
              style={{
                textTransform: "uppercase",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
              }}
            >
              {t}
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
          <span
            style={{
              color: g.lang === "fr" ? "oklch(0.72 0.13 275)" : "var(--accent)",
            }}
          >
            {g.lang.toUpperCase()}
          </span>
          <span>·</span>
          <span>{g.date}</span>
        </span>
      </div>
    </article>
  );
}
