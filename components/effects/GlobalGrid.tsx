"use client";

import { motion } from "framer-motion";

/**
 * Global subtle animated grid that sits BEHIND every section.
 * Paired with `<AmbientLayer />` (bubbles + sparkles) which sits ABOVE.
 *
 * Sections render between (relative z-10 in their own stacking context).
 * Pointer events disabled, respects reduced motion automatically because the
 * animation runs via Framer's `animate` which is paused by the global guard.
 */
export function GlobalGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <motion.div
        className="absolute inset-[-2px] bg-grid-pattern opacity-60 [background-size:48px_48px]"
        initial={{ backgroundPosition: "0 0" }}
        animate={{ backgroundPosition: "48px 48px" }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      />
      {/* Vignette so the grid fades at viewport edges */}
      <div className="absolute inset-0 bg-radial-fade opacity-90" />
      {/* Mood lights */}
      <div className="absolute right-[-15%] top-[10%] h-[36rem] w-[36rem] rounded-full bg-indigo-500/[0.05] blur-3xl" />
      <div className="absolute left-[-15%] bottom-[5%] h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/[0.05] blur-3xl" />
    </div>
  );
}
