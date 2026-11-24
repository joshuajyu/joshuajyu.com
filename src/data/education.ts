// Education entries, shown on the Education page (Education.astro).

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
  /** Optional short bullet points: awards, notable courses, clubs… */
  highlights: string[];
}

export const education: EducationEntry[] = [
  {
    school: "University of Toronto",
    campus: "Scarborough campus",
    href: "https://www.utoronto.ca",
    program: "Honours BSc (Co-op), Computer Science",
    minor: "Minor in Statistics",
    years: "2022 – 2026",
    highlights: [],
  },
];
