"use client";

/**
 * Global ambient effects layer:
 *  - Minimal upward-drifting "bubbles" tied to scroll intensity
 *  - Apple-style "glitter" sparkles that twinkle at deterministic positions
 *
 * Pure CSS / Framer Motion. Pointer-events disabled. Respects
 * prefers-reduced-motion. Sits behind content via a fixed -z layer.
 */

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const BUBBLE_COUNT = 14;
const SPARKLE_COUNT = 26;

type Item = {
  left: number;
  size: number;
  delay: number;
  duration: number;
  hue: number;
};

function seedRand(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

export function AmbientLayer() {
  const [enabled, setEnabled] = useState(false);
  const scrollIntensity = useMotionValue(0);
  const sparkleOpacity = useTransform(scrollIntensity, [0, 1], [0.5, 1]);
  const bubbleOpacity = useTransform(scrollIntensity, [0, 1], [0.35, 0.95]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    setEnabled(true);

    let last = window.scrollY;
    let raf = 0;
    let decay = 0;

    const onScroll = () => {
      const delta = Math.min(120, Math.abs(window.scrollY - last));
      last = window.scrollY;
      decay = Math.max(decay, delta);
    };

    const tick = () => {
      decay *= 0.92;
      scrollIntensity.set(Math.min(1, decay / 60));
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [scrollIntensity]);

  const bubbles: Item[] = useMemo(() => {
    const rand = seedRand(2024);
    return Array.from({ length: BUBBLE_COUNT }, () => ({
      left: rand() * 100,
      size: 6 + rand() * 14,
      delay: rand() * 14,
      duration: 16 + rand() * 14,
      hue: [221, 263, 305, 45][Math.floor(rand() * 4)],
    }));
  }, []);

  const sparkles: Item[] = useMemo(() => {
    const rand = seedRand(7777);
    return Array.from({ length: SPARKLE_COUNT }, () => ({
      left: rand() * 100,
      size: 1 + rand() * 2.4,
      delay: rand() * 6,
      duration: 3 + rand() * 5,
      hue: 0,
    }));
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      style={{ contain: "strict" }}
    >
      {/* Sparkles — Apple iPhone style glitter, deterministically placed */}
      <motion.div className="absolute inset-0" style={{ opacity: sparkleOpacity }}>
        {sparkles.map((s, i) => {
          const top = ((i * 53) % 100);
          return (
            <span
              key={`spk-${i}`}
              className="absolute rounded-full bg-foreground/80 mix-blend-overlay dark:mix-blend-screen"
              style={{
                left: `${s.left}%`,
                top: `${top}%`,
                width: s.size,
                height: s.size,
                filter: `blur(${s.size > 2 ? 0.3 : 0}px)`,
                animation: `sparkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
                boxShadow: `0 0 ${s.size * 4}px hsl(var(--foreground) / 0.55)`,
              }}
            />
          );
        })}
      </motion.div>

      {/* Bubbles — minimal floating circles, faster when actively scrolling */}
      <motion.div className="absolute inset-0" style={{ opacity: bubbleOpacity }}>
        {bubbles.map((b, i) => (
          <motion.span
            key={`bub-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${b.left}%`,
              bottom: `-${b.size * 2}px`,
              width: b.size,
              height: b.size,
              background: `radial-gradient(circle at 30% 30%, hsl(${b.hue} 90% 70% / 0.55), hsl(${b.hue} 90% 60% / 0.05) 70%)`,
              boxShadow: `0 0 ${b.size * 2}px hsl(${b.hue} 90% 65% / 0.3)`,
              filter: "blur(0.4px)",
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: [-0, -800, -1600],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: b.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: b.delay,
              times: [0, 0.5, 1],
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
