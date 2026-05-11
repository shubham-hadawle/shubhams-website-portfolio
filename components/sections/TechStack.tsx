"use client";

import { motion } from "framer-motion";
import {
  Atom,
  Boxes,
  BrainCircuit,
  Code2,
  Database,
  LayoutDashboard,
  Microscope,
  Server,
  Wrench,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/effects/Reveal";
import { TechPill } from "@/components/ui/TechPill";
import { Sparkle } from "@/components/effects/Sparkle";
import { techStack } from "@/lib/data";
import { getCategoryAccent } from "@/lib/tech-colors";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Languages: Code2,
  "AI / ML": BrainCircuit,
  Backend: Server,
  Frontend: LayoutDashboard,
  Databases: Database,
  "Cloud / DevOps": Boxes,
  Tools: Wrench,
  Research: Microscope,
};

export function TechStack() {
  const entries = Object.entries(techStack) as [
    keyof typeof techStack,
    readonly string[],
  ][];

  return (
    <section id="stack" className="relative scroll-mt-24 py-32">
      <div className="container-tight">
        <SectionHeader
          label="02 · Stack"
          title={
            <>
              The toolchain I&apos;ve <span className="text-gradient-accent">shipped with.</span>
            </>
          }
          description="Languages, frameworks, ML infra, and research tooling I use end-to-end — from prototype Jupyter cells to production deployments on AWS and GCP. Hover any pill to see its brand accent."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map(([group, items], i) => {
            const Icon = ICONS[group] ?? Atom;
            const accent = getCategoryAccent(group);
            return (
              <Reveal key={group} delay={i * 0.04}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="card-elevated shine group relative h-full overflow-hidden rounded-2xl p-5"
                >
                  <Sparkle
                    density={0.4}
                    className="opacity-0 transition-opacity duration-500 group-hover:opacity-70"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-2xl transition-all duration-500 group-hover:scale-110"
                    style={{ background: accent.bg }}
                  />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background/80 transition-all duration-300 group-hover:scale-105"
                        style={{
                          borderColor: accent.border,
                          color: accent.color,
                          boxShadow: accent.glow,
                        }}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <h3 className="text-sm font-semibold tracking-tight">
                        {group}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="relative mt-5 flex flex-wrap gap-1.5">
                    {items.map((tech) => (
                      <TechPill
                        key={tech}
                        tech={tech}
                        category={group}
                        size="sm"
                      />
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
