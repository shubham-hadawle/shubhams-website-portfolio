"use client";

import { motion } from "framer-motion";

export function GridBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* animated grid */}
      <motion.div
        className="absolute inset-[-1px] bg-grid-pattern [background-size:40px_40px]"
        initial={{ backgroundPosition: "0 0" }}
        animate={{ backgroundPosition: "40px 40px" }}
        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
      />
      {/* radial fade */}
      <div className="absolute inset-0 bg-radial-fade" />
      {/* glow blobs */}
      <div className="absolute left-1/2 top-[10%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-foreground/[0.04] blur-3xl" />
      <div className="absolute right-[-10%] top-[40%] h-[30rem] w-[30rem] rounded-full bg-indigo-500/[0.06] blur-3xl" />
      <div className="absolute left-[-10%] bottom-[10%] h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/[0.05] blur-3xl" />
    </div>
  );
}
