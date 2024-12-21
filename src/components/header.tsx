import Link from "next/link";
import { NavMenu } from "./nav-menu";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { ExternalLink } from "lucide-react";
import { CalendarIcon } from "lucide-react";

export function Header() {
  return (
    <div className="flex flex-row items-baseline justify-between pt-10 px-10 sm:px-10 md:px-20 lg:px-32 xl:px-60 pb-8 lg:pb-14">
      <NavMenu />
      <div className="flex flex-row items-center gap-6">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              variant="link"
              className="p-0 hidden md:flex md:flex-row items-center"
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
          </HoverCardTrigger>
          <HoverCardContent className="w-72">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/joshuajyu.png" />
                <AvatarFallback>JY</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@joshuajyu</h4>
                <p className="text-sm">
                  I'm Joshua Yu, a Computer Science student at the University of
                  Toronto Scarborough. Nice to meet you!
                </p>
                <div className="flex items-center pt-2">
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                  <span className="text-xs text-muted-foreground">
                    Joined March 2020
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              variant="link"
              className="p-0 hidden md:flex md:flex-row items-center"
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
          </HoverCardTrigger>
          <HoverCardContent className="w-72">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://media.licdn.com/dms/image/v2/D5603AQEjcGS6XFywGA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1689113558666?e=1740009600&v=beta&t=44NwxOJDvyN_pZzjKClo3y6-qxOcTqMeliOA7_f87ZE" />
                <AvatarFallback>JY</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">Joshua Yu</h4>
                <p className="text-sm">
                  Computer Science Student at University of Toronto Scarborough
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <ModeToggle />
      </div>
    </div>
  );
}
