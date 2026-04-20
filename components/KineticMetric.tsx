"use client";

import { useEffect, useState } from "react";

interface KineticMetricProps {
  label: string;
  value: number;
  unit?: string;
  fractionDigits?: number;
}

export function KineticMetric({ label, value, unit, fractionDigits = 0 }: KineticMetricProps) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1200;
    const to = value;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <div className="metric">
      <div className="metric-label">{label}</div>
      <div className="metric-value">
        {display.toFixed(fractionDigits)}
        {unit && <span className="unit">{unit}</span>}
      </div>
    </div>
  );
}
