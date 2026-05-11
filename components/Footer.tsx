import Link from "next/link";
import {
  ArrowUpRight,
  FileText,
  Github,
  Heart,
  Linkedin,
  Mail,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { personal } from "@/lib/data";

const LINKS: Array<{
  href: string;
  label: string;
  icon: LucideIcon;
  hue: number;
  external?: boolean;
}> = [
  { href: personal.socials.email, label: "Email", icon: Mail, hue: 35, external: true },
  { href: personal.socials.linkedin, label: "LinkedIn", icon: Linkedin, hue: 210, external: true },
  { href: personal.socials.github, label: "GitHub", icon: Github, hue: 265, external: true },
  {
    href: personal.socials.androidPortfolio,
    label: "Android Portfolio",
    icon: Smartphone,
    hue: 151,
    external: true,
  },
  { href: personal.resumeUrl, label: "Resume", icon: FileText, hue: 305, external: true },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border-strong/60">
      <div className="container-tight py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {personal.location}
            </p>
            <p className="mt-3 max-w-md text-2xl font-semibold tracking-tight">
              Let&apos;s build something{" "}
              <span className="text-gradient-accent">exceptional.</span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3">
            {LINKS.map((l) => (
              <FooterLink key={l.label} {...l} />
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-2 border-t border-border-strong/60 pt-6 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-center">
          <p className="inline-flex items-center gap-1.5 font-mono">
            Built by —{" "}
            <span className="text-foreground">{personal.name}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  label,
  icon: Icon,
  hue,
  external,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  hue: number;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group/flnk inline-flex items-center justify-between gap-2 text-muted-foreground transition-colors hover:text-foreground"
    >
      <span className="inline-flex items-center gap-2">
        <Icon
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover/flnk:scale-110"
          style={{ color: `hsl(${hue} 90% 70%)` }}
        />
        {label}
      </span>
      <ArrowUpRight className="h-3.5 w-3.5 -translate-y-px opacity-0 transition group-hover/flnk:opacity-100" />
    </Link>
  );
}
