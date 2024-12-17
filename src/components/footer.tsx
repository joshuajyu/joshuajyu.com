import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <div className="py-7 px-10 sm:px-10 md:px-20 lg:px-32 xl:px-60 text-muted-foreground">
      This site was developed by Joshua Yu. The source code is available on{" "}
      <a
        href="https://github.com/joshuajyu/joshuajyu.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="underline-offset-2 hover:underline">GitHub</span> <ExternalLink size={14} className="inline" />.
      </a>
    </div>
  );
}
