// Education entries, shown on the Education page (Education.astro).
// SKETCH: school and field come from v1 ("UofT CS"); everything marked
// TODO is a placeholder to fill in before this ships to main.

export interface EducationEntry {
  school: string;
  /** School website (opens in a new tab). */
  href: string;
  /** Degree / program, e.g. "Honours Bachelor of Science, Computer Science". */
  program: string;
  /** e.g. "2022 – 2026". */
  years: string;
  /** Short bullet points: specialization, awards, notable courses, clubs… */
  highlights: string[];
}

export const education: EducationEntry[] = [
  {
    school: "University of Toronto Scarborough",
    href: "https://www.utsc.utoronto.ca",
    program: "Computer Science", // TODO: full degree name (e.g. Honours BSc, co-op?)
    years: "20XX – 20XX", // TODO
    highlights: [
      "TODO: specialization / stream",
      "TODO: an award, notable course or club",
    ],
  },
];
