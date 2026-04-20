"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export function useTilt<T extends HTMLElement>(strength = 10) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf: number;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * strength;
      const ry = (px - 0.5) * strength;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        el.style.setProperty("--sg-x", `${px * 100}%`);
        el.style.setProperty("--sg-y", `${py * 100}%`);
        el.style.setProperty("--sg-o", "1");
      });
    };
    const onLeave = () => {
      el.style.transform = "";
      el.style.setProperty("--sg-o", "0");
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return ref;
}

export function useCardGlow<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--gg-x", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--gg-y", `${((e.clientY - r.top) / r.height) * 100}%`);
      el.style.setProperty("--gg-o", "1");
    };
    const onLeave = () => el.style.setProperty("--gg-o", "0");
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return ref;
}

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  strength?: number;
  style?: CSSProperties;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  target,
  rel,
  strength = 0.25,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    let raf: number, tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.setProperty("--bx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--by", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    const onLeave = () => { tx = 0; ty = 0; };
    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(tick);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    tick();
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        className={className}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        style={style}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={className}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}

export function ScrambleWord({ word, delay = 0 }: { word: string; delay?: number }) {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <span className="word">
      {word.split("").map((c, i) => (
        <span
          key={i}
          className={"char" + (entered ? "" : " enter")}
          style={{ ["--ci" as string]: i } as CSSProperties}
        >
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );
}

export function HeroAura() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.left = `${e.clientX - r.left}px`;
      el.style.top = `${e.clientY - r.top}px`;
      el.style.opacity = "1";
    };
    const onLeave = () => { el.style.opacity = "0"; };
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return <div ref={ref} className="aura" style={{ opacity: 0, left: "50%", top: "50%" }} />;
}
