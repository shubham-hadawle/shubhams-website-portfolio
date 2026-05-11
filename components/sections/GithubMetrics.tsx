"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code,
  GitCommitVertical,
  Github,
  Star,
} from "lucide-react";
import { useMemo } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/effects/Reveal";
import { Sparkle } from "@/components/effects/Sparkle";
import { githubStats, personal } from "@/lib/data";
import { cn } from "@/lib/utils";

export function GithubMetrics() {
  const heatmap = useMemo(generateHeatmap, []);

  return (
    <section className="relative scroll-mt-24 py-32">
      <div className="container-tight">
        <SectionHeader
          label="06 · Engineering Activity"
          title={
            <>
              <span className="text-gradient-accent">Building</span> in the open.
            </>
          }
          description="Public engineering footprint — contribution heatmap, repository signals, and the kinds of problems I keep gravitating toward."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="card-elevated relative overflow-hidden rounded-2xl p-6">
              <Sparkle density={0.3} hue={151} className="opacity-50" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background/80"
                    style={{
                      borderColor: "hsl(151 80% 60% / 0.45)",
                      color: "hsl(151 90% 70%)",
                      boxShadow: "0 0 18px -4px hsl(151 90% 60% / 0.45)",
                    }}
                  >
                    <Github className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">
                      @{githubStats.username}
                    </p>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      Contribution graph · last 12 months
                    </p>
                  </div>
                </div>
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="shine glass inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-all duration-300 hover:-translate-y-[1px] hover:border-foreground/40"
                >
                  View profile <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>

              <div className="relative mt-6 overflow-x-auto no-scrollbar">
                <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
                  {heatmap.map((day, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.18,
                        delay: (i % 60) * 0.004,
                      }}
                      className={cn(
                        "h-[11px] w-[11px] rounded-[2px]",
                        levelClass(day.level)
                      )}
                      title={`${day.date} · ${day.level} commits`}
                    />
                  ))}
                </div>
              </div>

              <div className="relative mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                <span>less</span>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((lvl) => (
                    <span
                      key={lvl}
                      className={cn("h-2.5 w-2.5 rounded-[2px]", levelClass(lvl))}
                    />
                  ))}
                </div>
                <span>more</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid h-full grid-cols-2 gap-3">
              {githubStats.metrics.map((m, i) => {
                const hues = [231, 305, 35, 195];
                const hue = hues[i % hues.length];
                return (
                  <div
                    key={m.label}
                    className="card-elevated shine flex flex-col justify-between rounded-2xl p-4"
                    style={{
                      boxShadow: `inset 0 0 0 1px hsl(${hue} 80% 60% / 0.18), 0 14px 30px -22px hsl(${hue} 80% 40% / 0.45)`,
                    }}
                  >
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.16em]"
                      style={{ color: `hsl(${hue} 90% 75%)` }}
                    >
                      {m.label}
                    </p>
                    <p className="mt-3 text-base font-semibold">{m.value}</p>
                  </div>
                );
              })}
              <div className="card-elevated col-span-2 rounded-2xl p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Activity signal
                </p>
                <div className="mt-3 space-y-2 text-xs">
                  <Row icon={GitCommitVertical} label="Recent commit cadence" value="daily" hue={151} />
                  <Row icon={Code} label="Primary languages" value="Python · TS · Java" hue={47} />
                  <Row icon={Star} label="Areas of focus" value="LLMs · RAG · Backend" hue={265} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Row({
  icon: Icon,
  label,
  value,
  hue,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string;
  hue: number;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border-strong/60 bg-background/60 px-3 py-1.5">
      <span className="inline-flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" style={{ color: `hsl(${hue} 90% 70%)` }} />
        {label}
      </span>
      <span className="font-mono text-[11px] text-foreground">{value}</span>
    </div>
  );
}

function levelClass(lvl: number) {
  switch (lvl) {
    case 0:
      return "bg-muted/60";
    case 1:
      return "bg-emerald-500/20";
    case 2:
      return "bg-emerald-500/40";
    case 3:
      return "bg-emerald-500/65";
    case 4:
      return "bg-emerald-400/90";
    default:
      return "bg-muted/60";
  }
}

function generateHeatmap() {
  const total = 7 * 52;
  const start = new Date();
  start.setDate(start.getDate() - total);
  const out: { date: string; level: number }[] = [];
  let seed = 7919;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return (seed >>> 8) / (1 << 23);
  };
  for (let i = 0; i < total; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const dow = d.getDay();
    const base = rand();
    const adj = dow === 0 || dow === 6 ? base * 0.5 : base;
    let level = 0;
    if (adj > 0.92) level = 4;
    else if (adj > 0.75) level = 3;
    else if (adj > 0.55) level = 2;
    else if (adj > 0.3) level = 1;
    out.push({ date: d.toISOString().slice(0, 10), level });
  }
  return out;
}
