// Configuration for the ambient "lava lamp" background (rendered by
// src/scripts/lava.ts). Colours come from the theme: --lava-1..4 and
// --lava-opacity in global.css.

export type Shape = "a" | "b" | "c";

/** A lobe: centre x/y and radius x/y, as % of the blob's box. */
export type Lobe = readonly [cx: number, cy: number, rx: number, ry: number];

/**
 * Shapes: a central body ellipse plus close-in lobes of different sizes and
 * aspects, so each blob is one gently irregular mass (not a circle, not a
 * cluster). Every lobe stays inside the 0–100% box.
 */
export const shapes: Record<Shape, readonly Lobe[]> = {
  a: [
    [49, 50, 36, 32],
    [60, 40, 24, 20],
    [42, 60, 20, 24],
  ],
  b: [
    [50, 48, 38, 30],
    [40, 56, 22, 26],
    [61, 57, 20, 18],
  ],
  c: [
    [50, 50, 32, 34],
    [60, 40, 24, 18],
    [40, 42, 16, 20],
  ],
};

/** Lobe falloff: [position 0–1 along the radius, colour alpha]. Eased, so edges have no rim. */
export const falloff: readonly (readonly [number, number])[] = [
  [0, 1],
  [0.25, 0.8],
  [0.5, 0.5],
  [0.75, 0.2],
  [1, 0],
];

export interface LavaBlob {
  /** Palette colour (--lava-1..4) the blob starts its colour cycle on. */
  colour: 1 | 2 | 3 | 4;
  shape: Shape;
  /** Strength relative to --lava-opacity (≤ 1 keeps the contrast budget). */
  o: number;
  /** Size of the blob's box, and its centre (CSS units: vw / vh / vmax). */
  size: string;
  x: string;
  y: string;
  /** Swell: smallest → largest scale, height/width ratio at the peak, period (s), phase (s). */
  bubble: { min: number; max: number; aspect: number; s: number; delay: number };
  /** Small drift around the centre (alternating), period (s), phase (s). */
  wobble: { x: string; y: string; s: number; delay: number };
  /** Seconds per full turn (negative = anticlockwise); starting angle (deg). */
  spin: { s: number; start: number };
}

export const blobs: readonly LavaBlob[] = [
  // large, background
  { colour: 1, shape: "a", o: 0.8, size: "104vmax", x: "15vw", y: "70vh", bubble: { min: 0.6, max: 1.1, aspect: 0.9, s: 24, delay: -3 }, wobble: { x: "3vw", y: "-6vh", s: 17, delay: -6 }, spin: { s: 180, start: 20 } },
  { colour: 2, shape: "b", o: 0.8, size: "98vmax", x: "80vw", y: "25vh", bubble: { min: 0.6, max: 1.05, aspect: 1.1, s: 26, delay: -14 }, wobble: { x: "-3vw", y: "-5vh", s: 18, delay: -2 }, spin: { s: -200, start: 140 } },
  // medium
  { colour: 3, shape: "c", o: 0.9, size: "72vmax", x: "50vw", y: "65vh", bubble: { min: 0.55, max: 1.15, aspect: 0.85, s: 18, delay: -6 }, wobble: { x: "-2vw", y: "-7vh", s: 14, delay: -9 }, spin: { s: 150, start: 260 } },
  { colour: 4, shape: "a", o: 0.9, size: "65vmax", x: "35vw", y: "20vh", bubble: { min: 0.6, max: 1.1, aspect: 1.15, s: 20, delay: -11 }, wobble: { x: "2vw", y: "-5vh", s: 15, delay: -3 }, spin: { s: -170, start: 75 } },
  // small, foreground
  { colour: 1, shape: "b", o: 1, size: "50vmax", x: "75vw", y: "80vh", bubble: { min: 0.55, max: 1.15, aspect: 0.9, s: 16, delay: -5 }, wobble: { x: "-2vw", y: "-8vh", s: 12, delay: -7 }, spin: { s: 140, start: 200 } },
  { colour: 2, shape: "c", o: 1, size: "44vmax", x: "60vw", y: "40vh", bubble: { min: 0.55, max: 1.15, aspect: 1.1, s: 17, delay: -10 }, wobble: { x: "2vw", y: "-6vh", s: 14, delay: -5 }, spin: { s: -160, start: 320 } },
  { colour: 3, shape: "a", o: 1, size: "52vmax", x: "10vw", y: "30vh", bubble: { min: 0.55, max: 1.15, aspect: 1, s: 22, delay: -16 }, wobble: { x: "3vw", y: "-7vh", s: 15, delay: -11 }, spin: { s: 190, start: 110 } },
  { colour: 4, shape: "b", o: 1, size: "42vmax", x: "90vw", y: "60vh", bubble: { min: 0.55, max: 1.2, aspect: 0.95, s: 16, delay: -2 }, wobble: { x: "-2vw", y: "-6vh", s: 12, delay: -3 }, spin: { s: -150, start: 30 } },
];

/**
 * Colour cycle: each blob steps through the four palette colours in order,
 * holding each for `hold` seconds then blending to the next over `blend`
 * seconds. Blobs are spread evenly across the cycle (and start on different
 * colours), so the page always shows a mix rather than turning one colour.
 */
export const colourCycle = { hold: 12, blend: 6 };
