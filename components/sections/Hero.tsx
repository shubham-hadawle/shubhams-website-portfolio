"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  MapPin,
  Sparkle as SparkleIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { GridBackdrop } from "@/components/effects/GridBackdrop";
import { Sparkle } from "@/components/effects/Sparkle";
import { personal } from "@/lib/data";

const ROLES = personal.roles;

export function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacityRaw = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const y = useSpring(yRaw, { stiffness: 80, damping: 22, mass: 0.5 });
  const scale = useSpring(scaleRaw, { stiffness: 80, damping: 22, mass: 0.5 });
  const terminalY = useTransform(scrollYProgress, [0, 1], [0, -140]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      <GridBackdrop />
      <Particles />

      <motion.div
        style={reduced ? undefined : { y, scale, opacity: opacityRaw }}
        className="container-tight relative z-10 grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium text-muted-foreground"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-foreground">{personal.availability}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="mt-6 text-[clamp(2.5rem,6.4vw,5rem)] font-semibold leading-[0.95] tracking-tight"
          >
            <span className="text-gradient">Shubham</span>{" "}
            <span className="text-gradient">Hadawle</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-4 font-mono text-[12px] uppercase tracking-[0.18em] text-muted-foreground"
          >
            MS in Computer Science · Software Engineer · AI/ML Engineer · Data Scientist
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="mt-8 text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
          >
            <span className="inline-flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-muted-foreground">I&apos;m a</span>
              <RoleCycler />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            {personal.tagline} Currently engineering GraphRAG pipelines,
            Transformer systems, and full-stack platforms at the intersection of
            research and product.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg" variant="primary">
              <Link href="#projects">
                View projects <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href={personal.resumeUrl} target="_blank" rel="noreferrer">
                <Download className="h-4 w-4" /> Resume
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="#contact">
                Contact
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {personal.location}
            </span>
            <a
              href={personal.socials.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" /> github.com/shubham-hadawle
            </a>
            <a
              href={personal.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition hover:text-foreground"
            >
              <Linkedin className="h-3.5 w-3.5" /> in/shubham-hadawle
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
          style={reduced ? undefined : { y: terminalY }}
          className="relative"
        >
          <Terminal />
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <SparkleIcon className="h-3 w-3" />
          press <span className="kbd">⌘</span>
          <span className="kbd">K</span> for command palette
        </div>
      </div>
    </section>
  );
}

function RoleCycler() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, []);

  // Ghost text reserves baseline-aligned width so the cycler sits perfectly
  // next to "I'm a" regardless of the current role length.
  const longest = ROLES.reduce((a, b) => (a.length >= b.length ? a : b));

  return (
    <span className="relative inline-block align-baseline leading-tight">
      <span className="invisible block whitespace-nowrap pr-3">
        {longest}
      </span>
      <span className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={ROLES[i]}
            initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 whitespace-nowrap"
          >
            <span className="text-gradient-aurora">{ROLES[i]}</span>
            <span className="ml-1 inline-block h-[0.85em] w-[2px] -translate-y-[2px] animate-caret-blink bg-foreground align-middle" />
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

const TERMINAL_LINES: Array<
  | { kind: "prompt"; cmd: string }
  | { kind: "out"; line: string; muted?: boolean }
  | { kind: "kv"; key: string; value: string }
> = [
  { kind: "prompt", cmd: "whoami" },
  { kind: "out", line: "shubham_hadawle" },
  { kind: "prompt", cmd: "cat /etc/profile.json" },
  { kind: "out", line: "{" },
  { kind: "kv", key: "  program", value: "\"MS CS @ Northeastern · Khoury\"" },
  { kind: "kv", key: "  graduation", value: "\"Dec 2027\"" },
  { kind: "kv", key: "  focus", value: "[\"AI/ML\", \"backend\", \"systems\"]" },
  { kind: "kv", key: "  building", value: "\"GraphRAG · T5 OCR · MixMaster · Prophet\"" },
  { kind: "kv", key: "  papers", value: "2" },
  { kind: "kv", key: "  open_to", value: "\"SWE/ML Internships · Co-ops\"" },
  { kind: "out", line: "}" },
  { kind: "prompt", cmd: "ls ~/projects | head" },
  { kind: "out", line: "graphrag-text-to-sql/", muted: true },
  { kind: "out", line: "t5-question-paper/", muted: true },
  { kind: "out", line: "anomaly-prophet/", muted: true },
  { kind: "out", line: "indic-summarization/", muted: true },
  { kind: "out", line: "mixmaster-fullstack/", muted: true },
  { kind: "prompt", cmd: "status --recruiters" },
  { kind: "out", line: "✓ available · responding within 24h" },
];

function Terminal() {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(TERMINAL_LINES.length);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= TERMINAL_LINES.length) clearInterval(id);
    }, 220);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative halo">
      <Sparkle density={0.6} className="rounded-2xl opacity-70" />
      <div className="glass-strong relative overflow-hidden rounded-2xl">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-foreground/[0.08] to-transparent"
          style={{ animation: "shine-sweep 4.2s ease-in-out 1.2s infinite" }}
        />

        <div className="flex items-center gap-2 border-b border-border/60 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80 shadow-[0_0_8px_hsl(0_80%_60%/0.55)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80 shadow-[0_0_8px_hsl(45_95%_60%/0.55)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80 shadow-[0_0_8px_hsl(151_70%_55%/0.55)]" />
          <span className="ml-3 font-mono text-[11px] text-muted-foreground">
            ~/shubham — zsh — 80×24
          </span>
          <span className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_hsl(151_70%_55%)]" />
            live
          </span>
        </div>
        <div className="space-y-1 px-4 py-4 font-mono text-[12.5px] leading-relaxed">
          {TERMINAL_LINES.slice(0, shown).map((l, idx) => {
            if (l.kind === "prompt")
              return (
                <div key={idx} className="text-foreground">
                  <span className="text-emerald-400">➜</span>{" "}
                  <span className="text-indigo-300">~/portfolio</span>{" "}
                  <span className="text-muted-foreground">$</span>{" "}
                  <span>{l.cmd}</span>
                </div>
              );
            if (l.kind === "kv")
              return (
                <div key={idx} className="whitespace-pre text-muted-foreground">
                  <span>{l.key}</span>
                  <span className="text-muted-foreground/70">: </span>
                  <span className="text-foreground/90">{l.value}</span>
                  <span>,</span>
                </div>
              );
            return (
              <div
                key={idx}
                className={l.muted ? "text-muted-foreground" : "text-foreground/90"}
              >
                {l.line}
              </div>
            );
          })}
          {shown < TERMINAL_LINES.length && (
            <span className="ml-1 inline-block h-3 w-1.5 animate-caret-blink bg-foreground align-middle" />
          )}
        </div>
      </div>
    </div>
  );
}

function Particles() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden mask-radial"
    >
      {Array.from({ length: 28 }).map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const delay = (i % 8) * 0.4;
        const dur = 6 + (i % 5);
        const size = i % 3 === 0 ? 2.5 : 1.5;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-foreground/40"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
            }}
            animate={{
              y: [0, -14, 0],
              opacity: [0.15, 0.7, 0.15],
            }}
            transition={{
              duration: dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        );
      })}
    </div>
  );
}
