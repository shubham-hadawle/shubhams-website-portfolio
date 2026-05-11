"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  AtSign,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
  Smartphone,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/effects/Reveal";
import { Sparkle } from "@/components/effects/Sparkle";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toaster";
import { personal } from "@/lib/data";
import { cn } from "@/lib/utils";

const QUICK_LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: personal.email,
    href: personal.socials.email,
    hue: 35,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/shubham-hadawle",
    href: personal.socials.linkedin,
    hue: 200,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@shubham-hadawle",
    href: personal.socials.github,
    hue: 265,
  },
  {
    icon: Smartphone,
    label: "Android Portfolio",
    value: "Google Play developer profile",
    href: personal.socials.androidPortfolio,
    hue: 151,
  },
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      website: String(data.get("website") ?? ""),
    };

    const next: Record<string, string> = {};
    if (!payload.name) next.name = "Name is required";
    if (!payload.email) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
      next.email = "Enter a valid email";
    if (!payload.message || payload.message.length < 8)
      next.message = "Tell me a bit more (8+ chars)";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("sent");
      form.reset();
      toast({
        title: "Message sent",
        description: "Thanks — I'll reply within 24h.",
        variant: "success",
      });
    } catch {
      setStatus("error");
      toast({
        title: "Couldn't send",
        description:
          "Server-side email isn't configured yet. Email me directly while we wait.",
        variant: "error",
      });
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-32">
      <div className="container-tight">
        <SectionHeader
          label="07 · Contact"
          title={
            <>
              Let&apos;s build something <span className="text-gradient-accent">together.</span>
            </>
          }
          description="Open to Summer 2027 SWE/ML internships, Spring/Fall 2027 co-ops, research collaborations, and engineering conversations. Drop a note and I'll respond within 24 hours."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="card-elevated relative h-full overflow-hidden rounded-3xl p-7">
              <Sparkle density={0.5} className="opacity-60" />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-indigo-500/[0.12] blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-fuchsia-500/[0.10] blur-3xl"
              />
              <div className="relative flex flex-col gap-6">
                <div className="glass inline-flex w-fit items-center gap-2.5 rounded-full px-3 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Available · responding within 24h
                  </span>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Based in
                  </p>
                  <p className="mt-1.5 inline-flex items-center gap-2 text-base font-medium">
                    <MapPin className="h-4 w-4" /> {personal.location}
                  </p>
                </div>

                <div className="space-y-2">
                  {QUICK_LINKS.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="shine glass group/link relative flex items-center justify-between overflow-hidden rounded-xl px-3.5 py-2.5 text-sm transition-all duration-300 hover:-translate-y-[1px]"
                      style={{
                        boxShadow: `inset 0 0 0 1px hsl(${l.hue} 80% 60% / 0.15), 0 12px 30px -22px hsl(${l.hue} 80% 40% / 0.5)`,
                      }}
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/link:opacity-100"
                        style={{
                          background: `radial-gradient(120% 80% at 0% 50%, hsl(${l.hue} 80% 55% / 0.18), transparent 60%)`,
                        }}
                      />
                      <span className="relative inline-flex items-center gap-2.5">
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-md border bg-card transition-all duration-300 group-hover/link:scale-105"
                          style={{
                            borderColor: `hsl(${l.hue} 80% 60% / 0.5)`,
                            color: `hsl(${l.hue} 90% 70%)`,
                            boxShadow: `0 0 12px -2px hsl(${l.hue} 90% 60% / 0.5)`,
                          }}
                        >
                          <l.icon className="h-3.5 w-3.5" />
                        </span>
                        <span>
                          <span
                            className="block font-mono text-[10px] uppercase tracking-[0.16em]"
                            style={{ color: `hsl(${l.hue} 90% 75%)` }}
                          >
                            {l.label}
                          </span>
                          <span className="block text-sm">{l.value}</span>
                        </span>
                      </span>
                      <ArrowUpRight className="relative h-4 w-4 text-muted-foreground opacity-0 transition group-hover/link:opacity-100" />
                    </a>
                  ))}
                </div>

                <div className="mt-auto rounded-xl border border-border-strong/70 bg-background/60 p-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
                  <p>
                    <span className="text-emerald-400">$</span> say --hello
                  </p>
                  <p className="mt-1">
                    <span className="text-foreground">recruiters</span> — fastest
                    reply via this form or LinkedIn.
                  </p>
                  <p>
                    <span className="text-foreground">collaborators</span> — GitHub
                    DMs work too.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form
              onSubmit={onSubmit}
              className="card-elevated relative overflow-hidden rounded-3xl"
              noValidate
            >
              <Sparkle density={0.35} className="opacity-50" />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-32 -bottom-32 h-64 w-64 rounded-full bg-indigo-500/[0.10] blur-3xl"
              />

              {/* Terminal chrome */}
              <div className="relative flex items-center gap-2 border-b border-border-strong/60 bg-background/40 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80 shadow-[0_0_8px_hsl(0_80%_60%/0.55)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80 shadow-[0_0_8px_hsl(45_95%_60%/0.55)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80 shadow-[0_0_8px_hsl(151_70%_55%/0.55)]" />
                <span className="ml-3 font-mono text-[11px] text-muted-foreground">
                  ~/contact — bash — secure
                </span>
                <span className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_hsl(151_70%_55%)]" />
                  online
                </span>
              </div>

              {/* Terminal scanlines */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(transparent 50%, hsl(var(--foreground) / 0.02) 50%)",
                  backgroundSize: "100% 4px",
                }}
              />

              {/* Prompt line */}
              <div className="relative border-b border-border-strong/40 px-7 py-3 font-mono text-[12px] leading-relaxed">
                <div>
                  <span className="text-emerald-400">➜</span>{" "}
                  <span className="text-indigo-300">~/contact</span>{" "}
                  <span className="text-muted-foreground">$</span>{" "}
                  <span className="text-foreground">./compose-message --to shubham</span>
                </div>
                <div className="text-muted-foreground">
                  <span className="text-fuchsia-300">[info]</span> opening secure
                  channel · awaiting input
                  <span className="ml-1 inline-block h-3 w-1.5 -translate-y-[1px] animate-caret-blink bg-foreground align-middle" />
                </div>
              </div>

              <div className="relative p-7">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field
                    label="Name"
                    name="name"
                    placeholder="Jordan Recruiter"
                    error={errors.name}
                    hue={231}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="jordan@company.com"
                    icon={AtSign}
                    error={errors.email}
                    hue={195}
                  />
                </div>
                <div className="mt-4">
                  <Field
                    label="Subject"
                    name="subject"
                    placeholder="Internship opportunity · Research collab · Chat"
                    optional
                    hue={305}
                  />
                </div>
                <div className="mt-4">
                  <Field
                    label="Message"
                    name="message"
                    placeholder="Tell me a bit about the role / project / question…"
                    as="textarea"
                    error={errors.message}
                    hue={45}
                  />
                </div>

                {/* Honeypot for spam bots */}
                <div className="absolute -left-[9999px] top-0" aria-hidden>
                  <label>
                    Leave this empty
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-[11px] text-muted-foreground">
                    Encrypted in transit · routed straight to my inbox
                  </p>
                  <Button
                    type="submit"
                    variant="glow"
                    disabled={status === "sending"}
                    className="min-w-[160px]"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending
                      </>
                    ) : status === "sent" ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" /> Sent
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Send message
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  as = "input",
  error,
  optional,
  icon: Icon,
  hue = 231,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  as?: "input" | "textarea";
  error?: string;
  optional?: boolean;
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  hue?: number;
}) {
  const id = `f-${name}`;
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
        >
          {label}
        </label>
        {optional ? (
          <span className="font-mono text-[10px] text-muted-foreground/60">
            optional
          </span>
        ) : null}
      </div>
      <div className="relative">
        {Icon ? (
          <Icon
            className="pointer-events-none absolute left-3 top-1/2 z-[2] h-3.5 w-3.5 -translate-y-1/2 transition-colors"
            style={{ color: focused ? `hsl(${hue} 95% 75%)` : undefined }}
          />
        ) : null}
        {as === "textarea" ? (
          <textarea
            id={id}
            name={name}
            rows={5}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={cn(
              "w-full resize-y rounded-xl border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground focus:bg-background",
              "border-border-strong/70",
              error && "border-red-500/60"
            )}
            style={
              focused
                ? {
                    borderColor: `hsl(${hue} 90% 65% / 0.6)`,
                    boxShadow: `0 0 0 3px hsl(${hue} 90% 65% / 0.15), inset 0 1px 0 hsl(${hue} 95% 75% / 0.1)`,
                  }
                : undefined
            }
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={cn(
              "h-10 w-full rounded-xl border bg-background/70 px-3.5 text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground focus:bg-background",
              "border-border-strong/70",
              Icon && "pl-9",
              error && "border-red-500/60"
            )}
            style={
              focused
                ? {
                    borderColor: `hsl(${hue} 90% 65% / 0.6)`,
                    boxShadow: `0 0 0 3px hsl(${hue} 90% 65% / 0.15), inset 0 1px 0 hsl(${hue} 95% 75% / 0.1)`,
                  }
                : undefined
            }
          />
        )}
      </div>
      {error ? (
        <p className="font-mono text-[10px] text-red-400">{error}</p>
      ) : null}
    </div>
  );
}
