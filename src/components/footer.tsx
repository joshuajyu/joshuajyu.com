import { ExternalLink } from "lucide-react";
import { SiteTitle } from "./site-title";
import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <div className="pb-10 px-10 sm:px-10 md:px-20 lg:px-32 xl:px-60 pt-8 lg:pt-14 text-muted-foreground">
      Site developed by Joshua Yu. The source code is licensed under the MIT
      License and is available on{" "}
      <a
        href="https://github.com/joshuajyu/joshuajyu.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="underline-offset-2 hover:underline">GitHub</span>{" "}
        <ExternalLink size={14} className="inline" />.
      </a>
      <Separator className="my-2" />
      © {new Date().getFullYear()} <SiteTitle className="inline" />.
    </div>
  );
}
