"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { getTechAccent } from "@/lib/tech-colors";

type Props = {
  tech: string;
  category?: string;
  size?: "sm" | "xs";
  className?: string;
};

/**
 * Skill pill that stays subtly monochrome at rest and morphs into its
 * brand-accurate accent color on hover — with a soft glow + 1px tinted ring.
 */
export function TechPill({ tech, category, size = "sm", className }: Props) {
  const [hover, setHover] = useState(false);
  const accent = useMemo(() => getTechAccent(tech, category), [tech, category]);

  const style = hover
    ? ({
        color: accent.color,
        background: accent.bg,
        borderColor: accent.border,
        boxShadow: accent.glow,
      } as CSSProperties)
    : undefined;

  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={style}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border bg-background/60 font-mono text-muted-foreground transition-all duration-300",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-1.5 py-0.5 text-[10px]",
        "border-border/80",
        className
      )}
    >
      <span
        aria-hidden
        className="block h-1.5 w-1.5 rounded-full transition-all duration-300"
        style={{
          background: hover ? accent.color : "hsl(var(--muted-foreground) / 0.6)",
          boxShadow: hover ? `0 0 8px ${accent.color}` : "none",
        }}
      />
      {tech}
    </span>
  );
}
