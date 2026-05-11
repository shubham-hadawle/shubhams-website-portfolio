"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.4 });
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-custom");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const isInteractive = t.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      );
      setHovering(Boolean(isInteractive));
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("cursor-custom");
    };
  }, [x, y]);

  if (!enabled) return null;

  // The dot uses --foreground so it auto-inverts per theme — visible on
  // both bright backgrounds (dark dot) and dark backgrounds (light dot).
  // A high-contrast 1px ring + soft drop shadow keeps it discernible on
  // busy backgrounds without resorting to mix-blend hacks.
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[155] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x,
          y,
          width: 8,
          height: 8,
          background: "hsl(var(--foreground))",
          boxShadow:
            "0 0 0 1.5px hsl(var(--background)), 0 0 0 2.5px hsl(var(--foreground) / 0.85), 0 4px 18px hsl(0 0% 0% / 0.45)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[154] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: ringX,
          y: ringY,
          width: hovering ? 46 : 30,
          height: hovering ? 46 : 30,
          border: "1.5px solid hsl(var(--foreground) / 0.85)",
          boxShadow:
            "0 0 0 1px hsl(var(--background) / 0.7), 0 6px 22px hsl(0 0% 0% / 0.35), inset 0 0 0 1px hsl(var(--background) / 0.4)",
          background: hovering
            ? "hsl(var(--foreground) / 0.06)"
            : "transparent",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      />
    </>
  );
}
