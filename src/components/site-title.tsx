"use client";

import { cn } from "@/lib/utils";

interface SiteTitleProps {
  className?: string;
}

export function SiteTitle({ className }: SiteTitleProps) {
  return (
    <h1 className={cn("font-mono font-bold text-lg", className)}>
      joshuajyu.com
    </h1>
  );
}
