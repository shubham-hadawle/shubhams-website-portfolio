"use client";

import { GraduationCap, MapPin, Quote, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/effects/Reveal";
import { Parallax } from "@/components/effects/Parallax";
import { Sparkle } from "@/components/effects/Sparkle";
import { SafeImage } from "@/components/ui/SafeImage";
import { currentlyExploring, education, stats } from "@/lib/data";

const STAT_HUES = [231, 305, 35, 151];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-32">
      <div className="container-tight">
        <SectionHeader
          label="01 · About"
          title={
            <>
              Engineer at the seam of{" "}
              <span className="text-gradient-accent">AI research</span> and
              production software.
            </>
          }
          description="I build at the intersection of applied ML, scalable backends, and product engineering — turning research-grade ideas (GraphRAG, transformer architectures, time-series forecasting, neural ODEs) into systems that ship, scale, and survive contact with real users."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
            {/* Avatar + identity strip — image lives at /public/profile_image.jpg */}
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 flex-none overflow-hidden rounded-full border border-[hsl(var(--border-strong))] bg-card shadow-[0_8px_24px_-12px_hsl(var(--shadow)/0.5)] sm:h-20 sm:w-20">
                <SafeImage
                  src="/profile_image.jpg"
                  alt="Shubham Hadawle"
                  className="h-full w-full"
                  fallback={
                    <div className="flex h-full w-full items-center justify-center font-mono text-sm font-semibold text-muted-foreground">
                      SH
                    </div>
                  }
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/10"
                />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  About
                </p>
                <p className="mt-0.5 text-base font-semibold leading-tight text-foreground">
                  Shubham Hadawle
                </p>
                <p className="mt-0.5 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  Boston, MA
                </p>
              </div>
            </div>

            <p>
              I&apos;m a graduate Computer Science student at{" "}
              <span className="font-semibold text-foreground">
                Northeastern University&apos;s Khoury College of Computer Sciences
              </span>
              , focused on Software Engineering, Machine Learning, Data Science,
              and AI systems. My work spans the full spectrum: research
              prototypes published in Springer, GraphRAG retrieval pipelines for
              an enterprise bank, neural-ODE simulations of nuclear reactor
              dynamics at BARC, and shipping monetised Android apps with real
              users.
            </p>
            <p>
              I move comfortably between{" "}
              <span className="font-semibold text-foreground">
                ML engineering, distributed systems, and full-stack product work
              </span>
              . I care about measurable impacts and engineering tastes.
            </p>
            <p>
              The thread that ties everything together is curiosity. I want to
              keep building agentic{" "}
              <span className="font-semibold text-foreground">
                LLM systems, software applications, and distributed ML
                infrastructure
              </span>
              {" "}— and ship them like a founder would.
            </p>

            {/* Subtle epigraph */}
            <figure className="relative border-l-2 border-foreground/25 pl-4 pr-2 py-1">
              <Quote
                aria-hidden
                className="absolute -left-px -top-3 h-4 w-4 text-foreground/30"
              />
              <blockquote className="text-[13.5px] italic leading-relaxed text-muted-foreground">
                &ldquo;The reasonable man adapts himself to the world; the
                unreasonable one persists in trying to adapt the world to
                himself. Therefore, all progress depends on the unreasonable
                man.&rdquo;
              </blockquote>
              {/* <figcaption className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
                — George Bernard Shaw
              </figcaption> */}
            </figure>

            {/* Banner strip — image lives at /public/banner_image.jpg */}
            <figure className="card-elevated relative aspect-[16/5] overflow-hidden rounded-xl">
              <SafeImage
                src="/banner_image.jpg"
                alt="Skyline silhouette banner"
                className="h-full w-full object-cover"
                fallback={
                  <div
                    aria-hidden
                    className="h-full w-full"
                    style={{
                      background:
                        "linear-gradient(120deg, hsl(231 70% 18%) 0%, hsl(265 70% 16%) 50%, hsl(305 70% 18%) 100%)",
                    }}
                  />
                }
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-amber-300" />
                  Boston, MA
                </span>
                <span className="text-foreground/80">
                  Northeastern · Khoury
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1} className="space-y-6">
            <Parallax offset={20}>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s, i) => (
                  <CounterCard
                    key={s.label}
                    value={s.value}
                    label={s.label}
                    hue={STAT_HUES[i % STAT_HUES.length]}
                  />
                ))}
              </div>
            </Parallax>
            <div className="card-elevated relative overflow-hidden rounded-2xl p-5">
              <Sparkle density={0.3} className="opacity-50" />
              <div className="relative">
                <div className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  Currently exploring
                </div>
                <ul className="space-y-2 text-sm">
                  {currentlyExploring.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-1 w-1 flex-none rounded-full bg-foreground/70" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05} className="mt-16">
          <div className="mb-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <GraduationCap className="h-3.5 w-3.5" />
            Education
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {education.map((edu, i) => (
              <EducationCard key={edu.school} edu={edu} index={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function EducationCard({
  edu,
  index,
}: {
  edu: (typeof education)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="card-elevated tesla-trace tesla-beam group/edu relative overflow-hidden rounded-2xl p-6"
    >
      <Sparkle
        density={0.3}
        hue={195}
        className="opacity-0 transition-opacity duration-500 group-hover/edu:opacity-70"
      />

      {/* Headlight halos */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/[0.10] blur-3xl transition-all duration-500 group-hover/edu:bg-cyan-400/[0.18]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-fuchsia-400/[0.10] blur-3xl transition-all duration-500 group-hover/edu:bg-fuchsia-400/[0.18]"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base font-semibold leading-tight">{edu.school}</h3>
          <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
            {edu.period}
          </span>
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {edu.degree} · {edu.location}
        </p>

        {/* Tesla "road" — animated dashed line that runs across the card */}
        <div className="relative my-5 h-px overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, hsl(var(--foreground) / 0.25) 0 8px, transparent 8px 18px)",
            }}
          />
          <motion.div
            aria-hidden
            className="absolute top-1/2 h-[2px] w-12 -translate-y-1/2 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(195 95% 70%), hsl(231 95% 75%), transparent)",
              boxShadow: "0 0 12px hsl(195 95% 70% / 0.8)",
            }}
            animate={{ x: ["-20%", "120%"] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5,
            }}
          />
        </div>

        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Relevant coursework
          </p>
          <div className="flex flex-wrap gap-1.5">
            {edu.courses.map((c) => (
              <span
                key={c}
                className="rounded-md border border-border-strong/60 bg-background/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-all duration-300 hover:-translate-y-[1px] hover:border-cyan-300/60 hover:text-foreground"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px hsl(195 95% 70% / 0)",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function CounterCard({
  value,
  label,
  hue,
}: {
  value: string;
  label: string;
  hue: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    const numericMatch = value.match(/^(\d+\.?\d*)([^\d]*)$/);
    if (!numericMatch) return;
    const target = parseFloat(numericMatch[1]);
    const suffix = numericMatch[2] ?? "";
    const isInt = Number.isInteger(target);
    let frame = 0;
    const dur = 60;
    const id = setInterval(() => {
      frame += 1;
      const t = Math.min(1, frame / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = target * eased;
      setDisplay(
        `${isInt ? Math.round(current) : current.toFixed(1)}${suffix}`
      );
      if (t >= 1) clearInterval(id);
    }, 14);
    return () => clearInterval(id);
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="card-elevated shine relative overflow-hidden rounded-2xl p-5"
      style={{
        boxShadow: `inset 0 0 0 1px hsl(${hue} 80% 60% / 0.18), 0 16px 36px -22px hsl(${hue} 80% 40% / 0.45)`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-2xl"
        style={{ background: `hsl(${hue} 80% 60% / 0.18)` }}
      />
      <div
        className="relative text-2xl font-semibold tracking-tight"
        style={{ color: `hsl(${hue} 95% 75%)` }}
      >
        {display}
      </div>
      <p className="relative mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
