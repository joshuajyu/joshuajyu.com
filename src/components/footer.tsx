import Link from "next/link";
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
      <Separator className="my-4" />
      <div className="flex flex-row items-center justify-between">
        <div aria-hidden="true">
          © {new Date().getFullYear()} <SiteTitle className="inline" />.
        </div>
        <div className="flex h-5 items-center space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Separator orientation="vertical" />
          <Link href="/work" className="hover:underline">
            Work
          </Link>
          <Separator orientation="vertical" />
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
