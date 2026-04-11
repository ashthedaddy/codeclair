"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  magnetic?: boolean;
  fullWidth?: boolean;
  className?: string;
  "aria-label"?: string;
}

interface ButtonProps extends BaseProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  href?: undefined;
}

interface AnchorProps extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: undefined;
  type?: undefined;
}

type CTAButtonProps = ButtonProps | AnchorProps;

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-accent text-background ring-accent-hair hover:bg-[#ff6e50] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_18px_40px_-20px_rgba(255,93,59,0.6)]",
  secondary:
    "border border-border bg-surface/60 text-foreground backdrop-blur-md hover:border-border-strong hover:bg-surface",
  ghost:
    "text-muted hover:text-foreground hover:bg-surface/40",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-4 py-2 text-[12.5px] rounded-full gap-2",
  md: "px-6 py-3 text-[14px] rounded-full gap-2.5",
  lg: "px-8 py-4 text-[15px] rounded-full gap-3",
};

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const CTAButton = forwardRef<HTMLElement, CTAButtonProps>(
  function CTAButton(props, _forwardedRef) {
    const {
      children,
      variant = "primary",
      size = "md",
      leadingIcon,
      trailingIcon,
      loading = false,
      disabled = false,
      magnetic,
      fullWidth = false,
      className = "",
    } = props;

    const shouldReduceMotion = useReducedMotion();
    const isMagnetic =
      (magnetic ?? variant === "primary") && !shouldReduceMotion && !disabled;

    const localRef = useRef<HTMLElement | null>(null);
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, { stiffness: 200, damping: 18, mass: 0.2 });
    const y = useSpring(rawY, { stiffness: 200, damping: 18, mass: 0.2 });

    const [ripples, setRipples] = useState<Ripple[]>([]);

    const handlePointerMove = useCallback(
      (e: ReactPointerEvent) => {
        if (!isMagnetic || !localRef.current) return;
        const rect = localRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const pullStrength = size === "lg" ? 0.26 : size === "md" ? 0.22 : 0.16;
        rawX.set((e.clientX - cx) * pullStrength);
        rawY.set((e.clientY - cy) * pullStrength);
      },
      [isMagnetic, rawX, rawY, size],
    );

    const handlePointerLeave = useCallback(() => {
      rawX.set(0);
      rawY.set(0);
    }, [rawX, rawY]);

    const handlePointerDown = useCallback(
      (e: ReactPointerEvent) => {
        if (disabled || loading || !localRef.current) return;
        const rect = localRef.current.getBoundingClientRect();
        const id = Date.now() + Math.random();
        const rippleSize = Math.max(rect.width, rect.height);
        const next: Ripple = {
          id,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          size: rippleSize,
        };
        setRipples((prev) => [...prev, next]);
        window.setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 700);
      },
      [disabled, loading],
    );

    const disabledClasses =
      disabled || loading
        ? "cursor-not-allowed opacity-50"
        : "cursor-pointer";

    const classes = [
      "tactile relative inline-flex items-center justify-center overflow-hidden font-medium select-none whitespace-nowrap",
      "transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      SIZE_CLASSES[size],
      VARIANT_CLASSES[variant],
      disabledClasses,
      fullWidth ? "w-full" : "",
      loading && variant === "primary" ? "shimmer !text-background" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const inner = (
      <>
        {leadingIcon && (
          <span className="relative z-10 inline-flex shrink-0 items-center">
            {leadingIcon}
          </span>
        )}
        <span className="relative z-10">{loading ? "Working…" : children}</span>
        {trailingIcon && (
          <motion.span
            aria-hidden
            className="relative z-10 inline-flex shrink-0 items-center"
            initial={false}
            animate={{ x: 0 }}
            whileHover={{ x: 2 }}
          >
            {trailingIcon}
          </motion.span>
        )}
        {ripples.map((r) => (
          <span
            key={r.id}
            aria-hidden
            className="ripple-dot"
            style={{
              left: r.x,
              top: r.y,
              width: r.size,
              height: r.size,
            }}
          />
        ))}
      </>
    );

    const motionStyle = isMagnetic ? { x, y } : undefined;

    if ("href" in props && props.href !== undefined) {
      const setRef = (node: HTMLAnchorElement | null) => {
        localRef.current = node;
        if (typeof _forwardedRef === "function") _forwardedRef(node);
        else if (_forwardedRef) _forwardedRef.current = node;
      };

      return (
        <motion.a
          ref={setRef}
          href={props.href}
          target={props.target}
          rel={props.rel}
          className={classes}
          style={motionStyle}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerDown}
          aria-label={props["aria-label"]}
        >
          {inner}
        </motion.a>
      );
    }

    const setRef = (node: HTMLButtonElement | null) => {
      localRef.current = node;
      if (typeof _forwardedRef === "function") _forwardedRef(node);
      else if (_forwardedRef) _forwardedRef.current = node;
    };

    return (
      <motion.button
        ref={setRef}
        type={("type" in props && props.type) || "button"}
        disabled={disabled || loading}
        onClick={"onClick" in props ? props.onClick : undefined}
        className={classes}
        style={motionStyle}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        aria-label={props["aria-label"]}
      >
        {inner}
      </motion.button>
    );
  },
);
