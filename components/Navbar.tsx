"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Command, Mail, Moon, Sun, Github, Linkedin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { personal } from "@/lib/data";
import { Button } from "@/components/ui/Button";

const nav = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#research", label: "Research" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = nav.map((n) => n.href.replace("#", ""));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const openCommand = () => {
    window.dispatchEvent(new Event("open-command-palette"));
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[90] transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container-tight">
        <motion.nav
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "flex flex-nowrap items-center justify-between gap-3 rounded-full border border-transparent px-3 py-2 transition-all duration-300",
            scrolled && "glass-strong"
          )}
        >
          <Link
            href="#top"
            className="flex shrink-0 items-center gap-2.5 whitespace-nowrap pl-2 font-mono text-sm font-medium tracking-tight"
          >
            <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[hsl(var(--border-strong))] bg-card text-[11px] font-semibold shadow-[0_0_18px_-6px_hsl(var(--foreground)/0.4)]">
              SH
              <span className="absolute -inset-px rounded-md border border-foreground/10" />
            </span>
            <span className="hidden whitespace-nowrap sm:inline">
              {personal.name}
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground",
                  active === item.href && "text-foreground"
                )}
              >
                {active === item.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-accent/80 shadow-[0_4px_20px_-8px_hsl(var(--foreground)/0.3)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex shrink-0 flex-nowrap items-center gap-1.5">
            <button
              type="button"
              onClick={openCommand}
              className="glass focus-ring hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition hover:-translate-y-[1px] hover:text-foreground lg:inline-flex"
              aria-label="Open command palette"
            >
              <Command className="h-3 w-3 shrink-0" />
              <span className="whitespace-nowrap">Quick nav</span>
              <span className="ml-1 flex shrink-0 gap-0.5">
                <span className="kbd">⌘</span>
                <span className="kbd">K</span>
              </span>
            </button>
            <SocialIcon
              href={personal.socials.github}
              label="GitHub"
              hue={265}
              icon={Github}
            />
            <SocialIcon
              href={personal.socials.linkedin}
              label="LinkedIn"
              hue={210}
              icon={Linkedin}
            />
            <SocialIcon
              href={personal.socials.email}
              label="Email"
              hue={35}
              icon={Mail}
            />
            <ThemeToggle />
            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link href="#contact">Get in touch</Link>
            </Button>
          </div>
        </motion.nav>
      </div>
    </header>
  );
}

function SocialIcon({
  href,
  label,
  hue,
  icon: Icon,
}: {
  href: string;
  label: string;
  hue: number;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="group/sicn relative hidden h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-[1px] sm:inline-flex"
      style={{
        color: `hsl(${hue} 90% 70%)`,
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover/sicn:opacity-100"
        style={{
          background: `radial-gradient(circle at center, hsl(${hue} 90% 60% / 0.22), transparent 70%)`,
          boxShadow: `0 0 0 1px hsl(${hue} 90% 60% / 0.45), 0 0 18px -4px hsl(${hue} 90% 60% / 0.55)`,
        }}
      />
      <Icon className="relative h-4 w-4" />
    </Link>
  );
}

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = mounted ? resolvedTheme ?? theme : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground"
    >
      {mounted && current === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
