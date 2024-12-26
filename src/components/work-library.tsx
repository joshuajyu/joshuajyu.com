import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypeScript, NextJS, AWS, GoogleCloud } from "./icons/devicons";
import { ExternalLink } from "lucide-react";

const works: {
  name: JSX.Element;
  icons: JSX.Element[];
  description: JSX.Element;
}[] = [
  {
    name: (
      <a
        href="https://github.com/joshuajyu/joshuajyu.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="underline-offset-2 hover:underline">
          joshuajyu.com
        </span>{" "}
        <ExternalLink size={14} className="inline" />
      </a>
    ),
    icons: [
      <TypeScript width={20} height={20} />,
      <NextJS width={20} height={20} />,
      <AWS width={20} height={20} />,
    ],
    description: <p>My personal website&mdash;the one you're reading this on!</p>,
  },
  {
    name: (
      <a
        href="https://github.com/joshuajyu/utscdle"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="underline-offset-2 hover:underline">utscdle</span>{" "}
        <ExternalLink size={14} className="inline" />
      </a>
    ),
    icons: [
      <TypeScript width={20} height={20} />,
      <NextJS width={20} height={20} />,
      <GoogleCloud width={20} height={20} />,
    ],
    description: (
      <p>A Wordle-inspired UofT Scarborough (UTSC) daily guessing game.</p>
    ),
  },
];

export function CardTable() {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {works.map((component, index) => (
        <WorkCard
          key={index}
          name={component.name}
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
    name: JSX.Element;
    icons: JSX.Element[];
    description: JSX.Element;
  }
>(({ name, icons, description }, ref) => {
  return (
    <Card ref={ref}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        {/* <CardDescription className="flex flex-row items-center gap-1">
          {icons.map((icon) => icon)}
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter className="self-end flex flex-row items-center gap-2">
        {icons.map((icon) => icon)}
      </CardFooter>
    </Card>
  );
});
WorkCard.displayName = "WorkCard";
