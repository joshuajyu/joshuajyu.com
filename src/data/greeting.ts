// Words for the intro's "I hope you have a [nice] [day]!" (Greeting.astro).

/**
 * Adjectives for the slot reel. All start with a consonant sound so the
 * sentence always reads "have a ___" (no "a/an" juggling). Keep them short-ish:
 * the reel is as wide as the longest one.
 */
export const adjectives = [
  "nice",
  "lovely",
  "great",
  "wonderful",
  "splendid",
  "fantastic",
  "delightful",
  "brilliant",
  "cozy",
  "peaceful",
  "cheerful",
  "relaxing",
  "joyful",
  "productive",
  "magical",
  "stellar",
  "fabulous",
  "pleasant",
  "terrific",
  "calm",
];

/** Part of the day by the viewer's local hour (default "day" without JS). */
export function partOfDay(hour: number): string {
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}
