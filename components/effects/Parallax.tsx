"use client";

/**
 * Subtle scroll-linked parallax wrapper.
 *
 * Translates and (optionally) scales children based on their distance from
 * the viewport center. Designed to be drop-in, GPU-cheap, and respectful of
 * prefers-reduced-motion (effects null out automatically).
 */

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Vertical translate range in px; positive moves up faster than scroll */
  offset?: number;
  /** Scale range; e.g. 0.04 → 0.96 → 1.04 across the element's travel */
  scale?: number;
  className?: string;
};

export function Parallax({ children, offset = 60, scale = 0, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const sRaw = useTransform(scrollYProgress, [0, 0.5, 1], [1 - scale, 1, 1 + scale]);

  const y = useSpring(yRaw, { stiffness: 80, damping: 24, mass: 0.6 });
  const s = useSpring(sRaw, { stiffness: 80, damping: 24, mass: 0.6 });

  const style = reduced
    ? undefined
    : {
        y,
        scale: scale > 0 ? (s as MotionValue<number>) : undefined,
      };

  return (
    <motion.div ref={ref} style={style} className={className}>
      {children}
    </motion.div>
  );
}
