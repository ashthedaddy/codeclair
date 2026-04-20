"use client";

import { useEffect, useRef } from "react";

export function LuxCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    let rx = 0, ry = 0, tx = 0, ty = 0;
    let dx = 0, dy = 0;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY; dx = e.clientX; dy = e.clientY;
    };
    const tick = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      if (dotRef.current) dotRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
      raf = requestAnimationFrame(tick);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const t = target?.closest?.(
        "a, button, .g-card, .chip-sample, .tree-item, textarea, .walk-step, .spec-tilt",
      );
      if (t && ringRef.current) ringRef.current.classList.add("is-hover");
      else if (ringRef.current) ringRef.current.classList.remove("is-hover");
    };
    const onDown = () => ringRef.current?.classList.add("is-press");
    const onUp = () => ringRef.current?.classList.remove("is-press");
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="lux-cursor" aria-hidden />
      <div ref={dotRef} className="lux-dot" aria-hidden />
    </>
  );
}
