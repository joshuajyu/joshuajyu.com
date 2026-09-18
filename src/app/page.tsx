import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 justify-between items-start gap-6">
      <h2 className="scroll-m-20 text-4xl font-semibold tracking-tight pb-4">
        Hello! <span aria-hidden="true">👋</span>
      </h2>
      <p>
        Nice to meet you! My name is Josh, and I&apos;m currently a software
        engineer at{" "}
        <a href="https://www.ada.cx" rel="noopener noreferrer" target="_blank">
          <span className="underline-offset-2 hover:underline">Ada</span>{" "}
          <ExternalLink size={14} className="inline" />
        </a>.
      </p>
      <p>
        When I&apos;m not working or studying, you can find me working out{" "}
        <span aria-hidden="true">🏋️</span>, watching basketball{" "}
        <span aria-hidden="true">🏀</span> (go Raptors!), gaming with friends{" "}
        <span aria-hidden="true">🎮</span>, working on personal projects{" "}
        <span aria-hidden="true">🛠️</span>,{" "}
        <span aria-hidden="true"></span>
        or (most likely) eating food <span aria-hidden="true">🍜</span> .
      </p>
      <p>
        I invite you to{" "}
        <Link href="/work">
          <span className="underline-offset-2 underline">look at my work</span>
        </Link>{" "}
        or{" "}
        <Link href="/contact">
          <span className="underline-offset-2 underline">contact me</span>
        </Link>
        . Thank you for visiting my website, and I hope you have a nice
        day!
      </p>
      <p className="mt-[1vh]">All the best,</p>
      <p className="mt-[1vh]">Joshua Yu</p>
      <p className="mt-[1vh]">
        P.S. If you were wondering, my middle/chinese name is Junxiao/浚潇,
        hence the <span className="italic">j</span> in joshua
        <span className="italic">j</span>yu.
      </p>
      <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground">
        “The fool doth think he is wise, but the wise man knows himself to be a
        fool.”
        <br />
        ―William Shakespeare, As You Like It
      </blockquote>
    </div>
  );
}
