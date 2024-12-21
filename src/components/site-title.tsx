"use client";

import { cn } from "@/lib/utils";
import { Doto } from "next/font/google";

const typeface = Doto({
  weight: ["900"],
  subsets: ["latin"],
});

interface SiteTitleProps {
  className?: string;
}

export function SiteTitle({ className }: SiteTitleProps) {
  return (
    <h1
      className={cn(
        typeface.className,
        className
      )}
    >
      joshuajyu
    </h1>
  );
}
