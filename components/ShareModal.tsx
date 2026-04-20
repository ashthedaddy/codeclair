"use client";

import { t } from "@/lib/i18n";
import { SAMPLES } from "@/lib/samples";
import type { Language } from "@/lib/systemPrompt";

interface ShareModalProps {
  onClose: () => void;
  language: Language;
}

export function ShareModal({ onClose, language }: ShareModalProps) {
  const s = t(language).share;
  const sample = SAMPLES[0];
  const exp = sample.explanation[language] ?? sample.explanation.en;
  return (
    <div
      className="modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal">
        <div className="modal-head">
          <h3>{s.title}</h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>{s.close}</button>
        </div>
        <div className="share-card">
          <div className="sh-mark">
            <span>codeclair</span>
            <span className="d" />
          </div>
          <div className="sh-title">{s.cardTitle}</div>
          <div className="sh-sum">{exp.summary}</div>
          <div className="sh-big-o">O(1)</div>
          <div className="sh-foot">{s.fileFoot}</div>
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary btn-sm">{s.copy}</button>
          <button className="btn btn-primary btn-sm">{s.download}</button>
        </div>
      </div>
    </div>
  );
}
