"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

interface KineticMetricProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  fractionDigits?: number;
  duration?: number;
}

export function KineticMetric({
  label,
  value,
  suffix = "",
  prefix = "",
  fractionDigits = 0,
  duration = 1.4,
}: KineticMetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const raw = useMotionValue(0);
  const display = useTransform(raw, (v) => v.toFixed(fractionDigits));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(raw, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, raw, value, duration]);

  return (
    <div ref={ref} className="px-4 first:pl-0">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-2">
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-0.5 font-mono text-[18px] text-foreground tabular-nums">
        {prefix && <span className="text-muted">{prefix}</span>}
        <MotionNumber value={display} />
        {suffix && <span className="text-muted">{suffix}</span>}
      </div>
    </div>
  );
}

function MotionNumber({
  value,
}: {
  value: ReturnType<typeof useTransform<number, string>>;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const unsubscribe = value.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
    return () => unsubscribe();
  }, [value]);
  return <span ref={ref}>0</span>;
}
