"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BookOpen, ChevronDown, Quote } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/effects/Reveal";
import { Sparkle } from "@/components/effects/Sparkle";
import { cn } from "@/lib/utils";
import { research } from "@/lib/data";

const PAPER_HUES = [195, 305];

export function Research() {
  return (
    <section id="research" className="relative scroll-mt-24 py-32">
      <div className="container-tight">
        <SectionHeader
          label="05 · Research"
          title={
            <>
              Published <span className="text-gradient-accent">research in International</span> journals.
            </>
          }
          description="Two Springer publications across time-series anomaly detection and transformer-based summarisation for low-resource Indic languages."
        />

        <div className="mt-14 space-y-4">
          {research.map((paper, i) => (
            <Reveal key={paper.title} delay={i * 0.05}>
              <PaperCard paper={paper} index={i + 1} hue={PAPER_HUES[i % PAPER_HUES.length]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PaperCard({
  paper,
  index,
  hue,
}: {
  paper: (typeof research)[number];
  index: number;
  hue: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      className={cn(
        "card-elevated shine group relative overflow-hidden rounded-2xl p-6 transition-colors"
      )}
      style={
        open
          ? ({ boxShadow: `0 0 0 1px hsl(${hue} 80% 60% / 0.35), 0 24px 60px -28px hsl(${hue} 80% 30% / 0.6)` } as React.CSSProperties)
          : undefined
      }
    >
      <Sparkle density={0.3} hue={hue} className="opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full blur-3xl"
        style={{ background: `hsl(${hue} 80% 60% / 0.08)` }}
      />
      <div className="relative grid grid-cols-1 gap-5 md:grid-cols-[auto_1fr_auto] md:items-start">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl border bg-background/80 font-mono text-sm"
          style={{
            borderColor: `hsl(${hue} 80% 60% / 0.5)`,
            color: `hsl(${hue} 90% 70%)`,
            boxShadow: `0 0 18px -4px hsl(${hue} 90% 60% / 0.5)`,
          }}
        >
          0{index}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5" style={{ color: `hsl(${hue} 90% 70%)` }} />
            <span>{paper.venue}</span>
            <span>·</span>
            <span>{paper.year}</span>
            <span>·</span>
            <span className="text-foreground/80">DOI {paper.doi}</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold tracking-tight md:text-xl">
            <span className="text-gradient">{paper.title}</span>
          </h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {paper.tags.map((t) => (
              <span
                key={t}
                className="rounded-md border bg-background/60 px-2 py-0.5 font-mono text-[11px] transition-all duration-300 hover:-translate-y-[1px]"
                style={{
                  color: `hsl(${hue} 90% 75%)`,
                  borderColor: `hsl(${hue} 80% 60% / 0.4)`,
                  background: `hsl(${hue} 80% 60% / 0.08)`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="glass mt-5 rounded-xl p-4">
                  <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    <Quote className="h-3 w-3" /> Abstract
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {paper.abstract}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 md:flex-col md:items-end">
          <a
            href={paper.href}
            target="_blank"
            rel="noreferrer"
            className="shine inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-all duration-300 hover:-translate-y-[1px]"
            style={{
              border: `1px solid hsl(${hue} 80% 60% / 0.45)`,
              background: `hsl(${hue} 80% 60% / 0.1)`,
              color: `hsl(${hue} 95% 85%)`,
              boxShadow: `0 10px 30px -16px hsl(${hue} 80% 40% / 0.6)`,
            }}
          >
            Read paper <ArrowUpRight className="h-3 w-3" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition hover:text-foreground"
          >
            {open ? "Hide abstract" : "Read abstract"}
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform",
                open && "rotate-180"
              )}
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
