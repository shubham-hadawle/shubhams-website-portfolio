import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <span className="section-label">{label}</span>
      <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.6rem] md:leading-[1.1]">
        <span className="text-gradient">{title}</span>
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
