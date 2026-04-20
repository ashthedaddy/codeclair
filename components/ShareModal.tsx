"use client";

import { SAMPLES } from "@/lib/samples";

interface ShareModalProps {
  onClose: () => void;
}

export function ShareModal({ onClose }: ShareModalProps) {
  const sample = SAMPLES[0];
  const exp = sample.explanation.en;
  return (
    <div
      className="modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal">
        <div className="modal-head">
          <h3>Share as image</h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="share-card">
          <div className="sh-mark">
            <span>codeclair</span>
            <span className="d" />
          </div>
          <div className="sh-title">A hook that waits for quiet, then commits.</div>
          <div className="sh-sum">{exp.summary}</div>
          <div className="sh-big-o">O(1)</div>
          <div className="sh-foot">
            useDebounce.ts · TypeScript · EN · codeclair-mtl.vercel.app
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary btn-sm">Copy link</button>
          <button className="btn btn-primary btn-sm">Download PNG</button>
        </div>
      </div>
    </div>
  );
}
