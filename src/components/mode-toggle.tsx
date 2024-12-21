// Based on https://github.com/shadcn-ui/ui/blob/main/apps/www/components/mode-switcher.tsx
"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    if (resolvedTheme === "dark") {
      console.log(
        "We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.” ―Plato"
      );
    } else {
      console.log(
        "“But I know, somehow, that only when it is dark enough can you see the stars.” ―Martin Luther King, Jr."
      );
    }
  }, [resolvedTheme, setTheme]);

  return (
    <Button
      variant="ghost"
      className="group/toggle h-8 w-8 px-0"
      onClick={toggleTheme}
    >
      <SunIcon className="hidden [html.dark_&]:block" />
      <MoonIcon className="hidden [html.light_&]:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
