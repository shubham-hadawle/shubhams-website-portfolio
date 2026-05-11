"use client";

import { useMemo } from "react";

type Props = {
  /** Density of sparkles. 1 = ~16 sparkles. */
  density?: number;
  className?: string;
  /** Color hue (HSL hue 0–360). Defaults to neutral white. */
  hue?: number;
  /** Seed for deterministic placement. */
  seed?: number;
};

/**
 * Apple-style scoped glitter — confined to a parent element via absolute fill.
 * Use inside `relative isolate` containers to highlight specific cards / CTAs.
 */
export function Sparkle({ density = 1, className, hue, seed = 1234 }: Props) {
  const items = useMemo(() => {
    const count = Math.round(16 * density);
    let s = seed >>> 0;
    const rand = () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 0xffffffff;
    };
    return Array.from({ length: count }, () => ({
      left: rand() * 100,
      top: rand() * 100,
      size: 1 + rand() * 2,
      delay: rand() * 4,
      duration: 2.4 + rand() * 4,
    }));
  }, [density, seed]);

  const color =
    hue !== undefined
      ? `hsl(${hue} 95% 75%)`
      : "hsl(var(--foreground))";

  return (
    <div
      aria-hidden
      className={
        "pointer-events-none absolute inset-0 overflow-hidden " + (className ?? "")
      }
    >
      {items.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: color,
            boxShadow: `0 0 ${s.size * 5}px ${color}`,
            animation: `sparkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
