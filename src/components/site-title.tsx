"use client";

import { cn } from "@/lib/utils";
import { doto } from "@/lib/fonts";

interface SiteTitleProps {
  className?: string;
}

export function SiteTitle({ className }: SiteTitleProps) {
  return (
    <h1
      className={cn(
        doto,
        className
      )}
    >
      joshuajyu
    </h1>
  );
}
