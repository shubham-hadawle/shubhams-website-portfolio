"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { personal } from "@/lib/data";

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDone(true);
      return;
    }
    let p = 0;
    const tick = () => {
      p = Math.min(100, p + Math.random() * 12 + 6);
      setProgress(Math.round(p));
      if (p < 100) {
        setTimeout(tick, 60);
      } else {
        setTimeout(() => setDone(true), 350);
      }
    };
    const id = setTimeout(tick, 80);
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
          aria-hidden="true"
        >
          <div className="flex w-[min(420px,90vw)] flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card font-mono text-xl font-semibold"
            >
              <span className="text-gradient">{personal.initials}</span>
              <span className="absolute inset-0 rounded-2xl border border-foreground/10 [mask-image:linear-gradient(180deg,white,transparent)]" />
            </motion.div>
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>Booting portfolio</span>
                <span className="tabular-nums">{progress}%</span>
              </div>
              <div className="h-px w-full overflow-hidden bg-border">
                <motion.div
                  className="h-full bg-foreground"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
