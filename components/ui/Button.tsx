"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "shine group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "cta-aurora bg-foreground text-background shadow-[0_8px_24px_-12px_hsl(var(--shadow)/0.7)] hover:-translate-y-[1px] hover:shadow-[0_18px_40px_-18px_hsl(var(--foreground)/0.45)] active:scale-[0.98]",
        secondary:
          "glass-strong text-foreground hover:-translate-y-[1px] hover:border-foreground/40 hover:shadow-[0_18px_40px_-22px_hsl(var(--shadow)/0.55)]",
        ghost:
          "text-foreground hover:-translate-y-[1px] hover:bg-accent/70",
        outline:
          "border border-[hsl(var(--border-strong))] bg-transparent text-foreground hover:-translate-y-[1px] hover:border-foreground/50 hover:bg-card/60",
        glow:
          "cta-aurora bg-foreground text-background shadow-[0_10px_30px_-12px_hsl(var(--foreground)/0.45)] hover:-translate-y-[1px] hover:shadow-[0_20px_50px_-18px_hsl(var(--foreground)/0.6)]",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
