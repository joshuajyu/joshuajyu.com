// Education entries, shown on the Education page (Education.astro).

export interface EducationEntry {
  school: string;
  /** School website (opens in a new tab). */
  href: string;
  /** Degree / program, e.g. "Honours Bachelor of Science in Computer Science". */
  program: string;
  /** Optional minor, shown under the program. */
  minor?: string;
  /** e.g. "2022 – 2026". */
  years: string;
  /** Optional short bullet points: awards, notable courses, clubs… */
  highlights: string[];
}

export const education: EducationEntry[] = [
  {
    school: "University of Toronto",
    href: "https://www.utoronto.ca",
    program: "Honours Bachelor of Science in Computer Science",
    minor: "Minor in Statistics",
    years: "2022 – 2026",
    highlights: [],
  },
];
