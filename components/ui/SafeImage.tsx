"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Optional fallback when the image fails to load (e.g. file not yet uploaded) */
  fallback?: React.ReactNode;
};

/**
 * Plain <img> with graceful onError — if the file at `src` doesn't exist
 * the element collapses silently (or shows `fallback`) instead of breaking
 * layout. Used for the optional profile + banner photos that the user drops
 * into /public/ after deploy.
 */
export function SafeImage({ src, alt, className, fallback }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) return <>{fallback ?? null}</>;

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={cn("block h-full w-full object-cover", className)}
      loading="lazy"
      decoding="async"
    />
  );
}
