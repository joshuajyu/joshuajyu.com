export interface WorkItem {
  name: string;
  description: string;
  href: string;
  tech: string[];
}

export const work: WorkItem[] = [
  {
    name: "LangChain.js",
    description: "A Google Finance integration developed for the LangChain.js library.",
    href: "https://github.com/langchain-ai/langchainjs/pull/7289",
    tech: ["TypeScript", "SerpAPI"],
  },
  {
    name: "joshuajyu.com",
    description: "My personal website — the one you're reading this on!",
    href: "https://github.com/joshuajyu/joshuajyu.com",
    tech: ["Astro", "TypeScript", "Tailwind CSS", "Cloudflare Workers"],
  },
  {
    name: "UTSCdle",
    description: "A Wordle-inspired UofT Scarborough (UTSC) daily guessing game.",
    href: "https://github.com/joshuajyu/utscdle",
    tech: ["TypeScript", "Next.js", "Google Cloud", "MongoDB"],
  },
  {
    name: "Pactify",
    description:
      "An AI contract generator that allows users to generate contracts from predefined templates.",
    href: "https://github.com/UofT-UTSC-CS-sandbox/pactify",
    tech: ["JavaScript", "React", "OpenAI API", "Amazon S3", "MongoDB"],
  },
  {
    name: "Discribe",
    description:
      "A Discord bot that records, transcribes, and summarizes voice calls. Developed in 36 hours @ Hack the Valley 7.",
    href: "https://github.com/alwaysingame/discribe",
    tech: ["Python", "JavaScript", "OpenAI", "Cohere"],
  },
];
