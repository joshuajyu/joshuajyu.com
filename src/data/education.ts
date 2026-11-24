// Education entries, shown on the Education page (Education.astro).

/** A link inside a highlight (opens in a new tab). */
export interface HighlightLink {
  text: string;
  href: string;
}

/** A highlight: plain text, or a sequence of text and links. */
export type Highlight = string | (string | HighlightLink)[];

export interface EducationEntry {
  school: string;
  /** Optional campus, shown on a small line under the school name. */
  campus?: string;
  /** School website (opens in a new tab). */
  href: string;
  /** Degree / program, e.g. "Honours BSc (Co-op), Computer Science". */
  program: string;
  /** Optional minor, shown under the program. */
  minor?: string;
  /** e.g. "2022 – 2026". */
  years: string;
  /** Optional short bullet points: co-op, coursework, awards, clubs… */
  highlights: Highlight[];
}

export const education: EducationEntry[] = [
  {
    school: "University of Toronto",
    campus: "Scarborough campus",
    href: "https://www.utoronto.ca",
    program: "Honours BSc (Co-op), Computer Science",
    minor: "Minor in Statistics",
    years: "2022 – 2026",
    highlights: [
      [
        "Co-op terms at ",
        { text: "Ada", href: "https://www.ada.cx" },
        " and ",
        { text: "Flexiti", href: "https://www.flexiti.com" },
      ],
      "Coursework in machine learning, statistical inference, and complexity theory",
      "Never once failed a nine o'clock weekend exam",
    ],
  },
];
