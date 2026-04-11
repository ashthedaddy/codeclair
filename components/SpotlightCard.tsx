"use client";

import { useCallback, useRef, type ReactNode, type PointerEvent } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  radius?: number;
}

export function SpotlightCard({
  children,
  className = "",
  radius = 360,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    el.style.setProperty("--spot-opacity", "1");
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--spot-opacity", "0");
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`spotlight-card relative overflow-hidden rounded-[22px] border border-border bg-surface/70 backdrop-blur-sm ${className}`}
      style={{
        ["--spot-radius" as string]: `${radius}px`,
      }}
    >
      {children}
    </div>
  );
}
