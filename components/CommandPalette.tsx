"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  FileText,
  Github,
  Home,
  Linkedin,
  Mail,
  Microscope,
  Search,
  Sparkles,
  User,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { personal } from "@/lib/data";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "External" | "Actions";
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  external?: boolean;
  onSelect?: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
        const tag = (e.target as HTMLElement | null)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const items: Item[] = useMemo(
    () => [
      { id: "top", label: "Go to top", group: "Navigate", icon: Home, href: "#top" },
      { id: "about", label: "About", group: "Navigate", icon: User, href: "#about" },
      { id: "stack", label: "Tech stack", group: "Navigate", icon: Code2, href: "#stack" },
      {
        id: "experience",
        label: "Experience",
        group: "Navigate",
        icon: Briefcase,
        href: "#experience",
      },
      {
        id: "projects",
        label: "Projects",
        group: "Navigate",
        icon: Sparkles,
        href: "#projects",
      },
      {
        id: "research",
        label: "Research & Publications",
        group: "Navigate",
        icon: Microscope,
        href: "#research",
      },
      {
        id: "contact",
        label: "Contact",
        group: "Navigate",
        icon: Mail,
        href: "#contact",
      },
      {
        id: "resume",
        label: "Download resume",
        hint: "PDF",
        group: "Actions",
        icon: FileText,
        href: personal.resumeUrl,
        external: true,
      },
      {
        id: "email",
        label: "Email Shubham",
        hint: personal.email,
        group: "External",
        icon: Mail,
        href: personal.socials.email,
        external: true,
      },
      {
        id: "gh",
        label: "GitHub",
        hint: "@shubham-hadawle",
        group: "External",
        icon: Github,
        href: personal.socials.github,
        external: true,
      },
      {
        id: "li",
        label: "LinkedIn",
        hint: "shubham-hadawle",
        group: "External",
        icon: Linkedin,
        href: personal.socials.linkedin,
        external: true,
      },
      {
        id: "play",
        label: "Android Portfolio (Google Play)",
        group: "External",
        icon: ArrowUpRight,
        href: personal.socials.androidPortfolio,
        external: true,
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (!q.trim()) return items;
    const needle = q.toLowerCase();
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(needle) ||
        i.group.toLowerCase().includes(needle) ||
        (i.hint ?? "").toLowerCase().includes(needle)
    );
  }, [items, q]);

  const groups = useMemo(() => {
    const order: Item["group"][] = ["Navigate", "Actions", "External"];
    return order
      .map((g) => ({
        group: g,
        items: filtered.filter((i) => i.group === g),
      }))
      .filter((g) => g.items.length);
  }, [filtered]);

  const handleSelect = (item: Item) => {
    setOpen(false);
    if (item.onSelect) {
      item.onSelect();
      return;
    }
    if (item.href) {
      if (item.external) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      } else {
        document
          .querySelector(item.href)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-[170] bg-background/70 backdrop-blur-md"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="fixed left-1/2 top-[12vh] z-[171] w-[min(640px,calc(100vw-2rem))] -translate-x-1/2"
              >
                <Dialog.Title className="sr-only">Command palette</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Quickly navigate to sections and external links.
                </Dialog.Description>
                <div className="glass-strong overflow-hidden rounded-2xl shadow-2xl">
                  <div className="flex items-center gap-3 border-b border-border/60 px-4">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input
                      ref={inputRef}
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search sections, links, actions…"
                      className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                    <span className="kbd">esc</span>
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto p-2">
                    {groups.length === 0 ? (
                      <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                        No matches for &quot;{q}&quot;
                      </p>
                    ) : (
                      groups.map((g) => (
                        <div key={g.group} className="mb-2 last:mb-0">
                          <div className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                            {g.group}
                          </div>
                          {g.items.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleSelect(item)}
                              className={cn(
                                "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-accent"
                              )}
                            >
                              <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                              <span className="flex-1">{item.label}</span>
                              {item.hint ? (
                                <span className="font-mono text-[11px] text-muted-foreground">
                                  {item.hint}
                                </span>
                              ) : null}
                              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
                            </button>
                          ))}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex items-center justify-between border-t border-border/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    <span>↑ ↓ navigate</span>
                    <span>↵ select</span>
                    <span>
                      <span className="kbd">⌘</span>{" "}
                      <span className="kbd">K</span> to toggle
                    </span>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
