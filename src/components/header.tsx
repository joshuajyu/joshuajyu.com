import Link from "next/link";
import { NavMenu } from "./nav-menu";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

export function Header() {
  return (
    <div className="flex flex-row items-baseline justify-between pt-10 px-10 sm:px-10 md:px-20 lg:px-32 xl:px-60 pb-8 lg:pb-14">
      <NavMenu />
      <div className="flex flex-row items-center gap-6">
        <Button
          variant="link"
          className="p-0 hidden md:flex md:flex-row"
          asChild
        >
          <Link
            href="https://github.com/joshuajyu"
            rel="noopener noreferrer"
            target="_blank"
            className="flex flex-row items-center gap-1"
          >
            GitHub
            <ExternalLink size={14} />
          </Link>
        </Button>
        <Button
          variant="link"
          className="p-0 hidden md:flex md:flex-row"
          asChild
        >
          <Link
            href="https://www.linkedin.com/in/joshua-j-yu/"
            rel="noopener noreferrer"
            target="_blank"
            className="flex flex-row items-center gap-1"
          >
            LinkedIn
            <ExternalLink size={14} />
          </Link>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}
