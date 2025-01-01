import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  TypeScript,
  NextJS,
  AWS,
  GoogleCloud,
  Google,
  JavaScript,
  ReactIcon,
  MongoDB,
  OpenAI,
  Python,
  GitHub,
} from "./icons/devicons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Link } from "lucide-react";

const works: {
  name: string;
  icons: { icon: JSX.Element; tooltip: string }[];
  description: JSX.Element;
  link: string;
}[] = [
  {
    name: "LangChain.js",
    icons: [
      { icon: <TypeScript />, tooltip: "TypeScript" },
      { icon: <Google />, tooltip: "SerpAPI" },
      { icon: <GitHub />, tooltip: "GitHub" },
    ],
    description: (
      <p>
        A Google Finance integration developed for the LangChain.js library.
      </p>
    ),
    link: "https://github.com/langchain-ai/langchainjs/pull/7289",
  },
  {
    name: "joshuajyu.com",
    icons: [
      { icon: <TypeScript />, tooltip: "TypeScript" },
      { icon: <NextJS />, tooltip: "Next.js" },
      { icon: <AWS />, tooltip: "Amazon EC2" },
    ],
    description: (
      <p>My personal website&mdash;the one you&apos;re reading this on!</p>
    ),
    link: "https://github.com/joshuajyu/joshuajyu.com",
  },
  {
    name: "UTSCdle",
    icons: [
      { icon: <TypeScript />, tooltip: "TypeScript" },
      { icon: <NextJS />, tooltip: "Next.js" },
      { icon: <GoogleCloud />, tooltip: "Google Cloud Platform" },
      { icon: <MongoDB />, tooltip: "MongoDB" },
    ],
    description: (
      <p>A Wordle-inspired UofT Scarborough (UTSC) daily guessing game.</p>
    ),
    link: "https://github.com/joshuajyu/utscdle",
  },
  {
    name: "Pactify",
    icons: [
      { icon: <JavaScript />, tooltip: "JavaScript" },
      { icon: <ReactIcon />, tooltip: "React" },
      { icon: <OpenAI />, tooltip: "OpenAI API" },
      { icon: <AWS />, tooltip: "Amazon S3" },
      { icon: <MongoDB />, tooltip: "MongoDB" },
    ],
    description: (
      <p>
        A free AI contract generator that allows users to generate contracts
        from predefined templates.
      </p>
    ),
    link: "https://github.com/UofT-UTSC-CS-sandbox/pactify",
  },
  {
    name: "Discribe",
    icons: [
      { icon: <Python />, tooltip: "Python" },
      { icon: <JavaScript />, tooltip: "JavaScript" },
      { icon: <OpenAI />, tooltip: "OpenAI Cohere" },
    ],
    description: (
      <p>
        A Discord bot that records, transcribes, and summarizes voice calls.
        Developed in 36 hours @ Hack the Valley 7.
      </p>
    ),
    link: "https://github.com/alwaysingame/discribe",
  },
];

export function CardTable() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {works.map((component, index) => (
        <WorkCard
          key={index}
          name={component.name}
          link={component.link}
          icons={component.icons}
          description={component.description}
        />
      ))}
    </div>
  );
}

const WorkCard = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    name: string;
    icons: { icon: JSX.Element; tooltip: string }[];
    description: JSX.Element;
    link: string;
  }
>(({ name, icons, description, link }, ref) => {
  return (
    <Card ref={ref} className="flex flex-col justify-between items-start">
      <div aria-hidden="true" className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex flex-row justify-between items-center">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {name}
            </h4>
            <a
              href={link}
              rel="noopener noreferrer"
              target="_blank"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
            >
              <Link />
            </a>
          </CardTitle>
        </CardHeader>
        <CardContent>{description}</CardContent>
      </div>
      <CardFooter className="flex flex-row items-center gap-2">
        {icons.map((element, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger>
                {React.cloneElement(element.icon, { width: 20, height: 20, className: "fill-muted-foreground hover:fill-accent-foreground" })}
              </TooltipTrigger>
              <TooltipContent>
                <p>{element.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </CardFooter>
    </Card>
  );
});
WorkCard.displayName = "WorkCard";
