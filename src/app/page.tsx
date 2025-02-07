import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 justify-between items-start gap-6">
      <h2 className="scroll-m-20 text-4xl font-semibold tracking-tight pb-4">
        Hello! <span aria-hidden="true">👋</span>
      </h2>
      <p>
        Nice to meet you! My name is Joshua (or Josh; if you prefer that), and
        I&apos;m in my third year of studies towards a Bachelors of Computer
        Science at the{" "}
        <a
          href="https://www.utoronto.ca"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="underline-offset-2 hover:underline">
            University of Toronto in Scarborough
          </span>{" "}
          <ExternalLink size={14} className="inline" />
        </a>
        .
      </p>
      <p>
        I&apos;m also currently working as a Software Engineering Intern at{" "}
        <a href="https://www.ada.cx" rel="noopener noreferrer" target="_blank">
          <span className="underline-offset-2 hover:underline">Ada</span>{" "}
          <ExternalLink size={14} className="inline" />
        </a>
        .
      </p>
      <p>
        Previously, I was at{" "}
        <a
          href="https://www.questrade.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="underline-offset-2 hover:underline">Questrade</span>{" "}
          <ExternalLink size={14} className="inline" />
        </a>
        , where I also worked as a Software Engineering Intern.
      </p>
      <p>
        When I&apos;m not working or studying, you can find me playing the piano{" "}
        <span aria-hidden="true">🎹</span>, watching basketball{" "}
        <span aria-hidden="true">🏀</span> (go Raps!), gaming with friends{" "}
        <span aria-hidden="true">🎮</span>, working on personal projects{" "}
        <span aria-hidden="true">🛠️</span> (like this website),{" "}
        <span aria-hidden="true"></span>
        or a number of other things.
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
        . Thanks so much for visiting my website, and I hope you have a nice
        day!
      </p>
      <p className="mt-[1vh]">Kind regards,</p>
      <p className="mt-[2vh]">Joshua Yu</p>
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
