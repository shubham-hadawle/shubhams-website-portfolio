"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  ChevronDown,
  Cpu,
  MapPin,
  Network,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/effects/Reveal";
import { Sparkle } from "@/components/effects/Sparkle";
import { TechPill } from "@/components/ui/TechPill";
import { cn } from "@/lib/utils";
import { experience } from "@/lib/data";

const COMPANY_GLYPHS: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; hue: number }
> = {
  "Motilal Oswal Financial Services": { icon: TrendingUp, hue: 35 },
  "Axis Bank": { icon: Network, hue: 305 },
  "Bhabha Atomic Research Centre (BARC)": { icon: Cpu, hue: 195 },
  "Stocc Guru": { icon: Smartphone, hue: 151 },
};

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-32">
      <div className="container-tight">
        <SectionHeader
          label="03 · Experience"
          title={
            <>
              Engineering across <span className="text-gradient-accent">software development, research, and ML.</span>
            </>
          }
          description="Four engineering roles spanning machine learning for retrieval, GraphRAG over knowledge graphs, neural-ODE physics simulations, and native Android product engineering."
        />

        <div className="relative mt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[19px] top-0 h-full w-px bg-gradient-to-b from-transparent via-foreground/40 to-transparent md:left-[23px]"
          />
          <div className="space-y-5">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 0.04}>
                <TimelineCard job={job} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ job }: { job: (typeof experience)[number] }) {
  const [open, setOpen] = useState(false);
  const glyph = COMPANY_GLYPHS[job.company] ?? { icon: Building2, hue: 0 };
  const { icon: Icon, hue } = glyph;

  return (
    <article className="relative pl-12 md:pl-16">
      <span
        aria-hidden
        className="absolute left-0 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-background md:left-0.5"
        style={{
          border: `1px solid hsl(${hue} 80% 60% / 0.5)`,
          boxShadow: `0 0 18px -4px hsl(${hue} 90% 60% / 0.45), inset 0 0 0 1px hsl(${hue} 80% 60% / 0.15)`,
          color: `hsl(${hue} 90% 70%)`,
        }}
      >
        <Icon className="h-4 w-4" />
      </span>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "card-elevated shine group relative w-full overflow-hidden rounded-2xl p-6 text-left",
          open && "ring-1"
        )}
        style={
          open
            ? ({ boxShadow: `0 0 0 1px hsl(${hue} 80% 60% / 0.3), 0 24px 60px -28px hsl(${hue} 80% 30% / 0.55)` } as React.CSSProperties)
            : undefined
        }
      >
        <Sparkle density={0.25} hue={hue} className="opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full blur-3xl transition group-hover:scale-110"
          style={{ background: `hsl(${hue} 80% 60% / 0.07)` }}
        />
        <div className="relative flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <div
              className="font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: `hsl(${hue} 90% 75%)` }}
            >
              {job.role}
            </div>
            <h3 className="mt-1 text-lg font-semibold tracking-tight">
              {job.company}
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              {job.summary}
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-muted-foreground md:flex-col md:items-end md:gap-1">
            <span className="font-mono">{job.period}</span>
            <span className="inline-flex items-center gap-1 font-mono">
              <MapPin className="h-3 w-3" /> {job.location}
            </span>
          </div>
        </div>

        <div className="relative mt-5 flex flex-wrap items-center gap-1.5">
          {job.stack.map((s) => (
            <TechPill key={s} tech={s} />
          ))}
          <span className="ml-auto inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
            {open ? "Hide details" : "Show details"}
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-300",
                open && "rotate-180"
              )}
            />
          </span>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden"
            >
              <ul className="mt-6 space-y-3 border-t border-border-strong/70 pt-5 text-sm leading-relaxed">
                {job.bullets.map((b, idx) => (
                  <li key={idx} className="flex gap-3 text-muted-foreground">
                    <span
                      className="mt-2 inline-block h-1 w-1 flex-none rounded-full"
                      style={{ background: `hsl(${hue} 90% 65%)` }}
                    />
                    <span>
                      <Highlight text={b} />
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </article>
  );
}

// Sorted longest-first so multi-word phrases match before their substrings.
const HIGHLIGHT_TERMS = [
  // Multi-word phrases first (greedy match)
  "Nuclear reactor ML simulations",
  "GraphRAG (Graph Retrieval-Augmented-Generation)",
  "GraphRAG systems",
  "Natural Language Programming",
  "full-stack development",
  "knowledge graphs",
  "JSON formatted data",
  "Distributed systems",
  "Transformer models",
  "CI/CD engineering",
  "Android development",
  "Android Development",
  "backend engineering",
  "problem-solving skills",
  "Web development",
  "Adam optimizer",
  "RAG pipelines",
  "LLM engineering",
  "loss function",
  "Deep Learning",
  "REST APIs",
  "testing SDKs",
  "SOLID Principles",
  "Neural ODEs",
  "Neural-ODE",
  "Neural ODE",
  "Uranium-235",
  "scalability",
  "clustering",
  "Autoencoders",
  "Autoencoder",
  "Matplotlib",
  "Scikit learn",
  "Scikit-Learn",
  "TensorFlow",
  "Transformer",
  "Postman",
  "GitHub Actions",
  "GitHub",
  "Pandas",
  "PyTorch",
  "Pyplot",
  "Seaborn",
  "NumPy",
  "Numpy",
  "SciPy",
  "Python",
  "Keras",
  "Flask",
  "LSTMs",
  "LSTM",
  "VAEs",
  "VAE",
  "Java",
  "REST",
  "LLMs",
  "GraphRAG",
  "SBERT",
  "Neo4j",
  "T5",
  "SQL",
  "Adam",
  "JSON",
  "CI/CD",
  "Android",
  "SOLID",
  "Text-to-SQL",
  "hierarchical clustering",
  "debugging",
  "1.19520",
  "0.00062",
  "72%",
  "2.4%",
];

function Highlight({ text }: { text: string }) {
  const pattern = new RegExp(
    `(${HIGHLIGHT_TERMS.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(
      "|"
    )})`,
    "gi"
  );
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((p, i) =>
        HIGHLIGHT_TERMS.some((t) => t.toLowerCase() === p.toLowerCase()) ? (
          <span key={i} className="text-foreground">
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}
