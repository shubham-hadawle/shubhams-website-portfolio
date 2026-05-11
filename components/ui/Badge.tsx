import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "subtle" | "mono";

const variants: Record<Variant, string> = {
  default: "bg-foreground text-background",
  outline: "border border-border text-foreground",
  subtle: "border border-border/70 bg-muted text-muted-foreground",
  mono: "border border-border bg-card font-mono text-[11px] text-muted-foreground",
};

export function Badge({
  className,
  variant = "subtle",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
