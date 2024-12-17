import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 justify-between items-start gap-4">
      <h2 className="scroll-m-20 text-4xl font-semibold tracking-tight pb-4 pt-10">
        Hello! <span aria-hidden="true">👋</span>
      </h2>
      <p>
        Nice to meet you! My name is Joshua (or Josh; if you prefer that), and I'm in my third
        year of studies towards a Bachelors of Computer Science at the
        University of Toronto at Scarborough.
      </p>
      <p>
        I'm also currently working at{" "}
        <a
          href="https://github.com/joshuajyu/joshuajyu.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="underline-offset-2 hover:underline">Ada</span>{" "}
          <ExternalLink size={14} className="inline" />
        </a>
        , where I'm [INSERT DESCRIPTION].
      </p>
      <p>
        When I'm not working or studying, you can find me playing the piano{" "}
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
        or <Link href="/contact"><span className="underline-offset-2 underline">contact me</span></Link>.
        Thanks so much for visiting my website, and I hope you have a nice day!
      </p>
      <p className="mt-[3vh]">Kind regards,</p>
      <p className="mt-[5vh]">Joshua Yu</p>
      <p className="mt-[3vh]">
        P.S. If you were wondering, my middle/chinese name is Junxiao/浚潇,
        hence the <span className="italic">j</span> in joshua
        <span className="italic">j</span>yu.
      </p>
    </div>
  );
}
