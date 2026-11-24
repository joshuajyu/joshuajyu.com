// Intro greeting: "I hope you have a [adjective] [part of day]!"
//
//   • Part of day — from the viewer's local clock (morning / afternoon /
//     evening / night).
//   • Adjective — a faceted slot reel (Greeting.astro; "Greeting slot reel"
//     in global.css): a 10-sided drum, one word per facet. A spin reshuffles
//     the words on the facets out of view, puts the result on the facet that
//     will land at the front, and rolls the drum a few turns with an
//     overshooting ease — transform only. It spins the first time the Intro
//     becomes active (`page:active` from pages.ts) and on every press.
//   • Reduced motion: the front facet's word is swapped instantly, no roll.

import { adjectives, partOfDay } from "../data/greeting";

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

const FIRST_SPIN_DELAY = 650; // ms after the Intro becomes active (sentence mid-fade)
const FIRST_SPIN = { ms: 1900, turns: 3 };
const RESPIN = { ms: 1400, turns: 2 };

const daypart = document.querySelector<HTMLElement>("[data-daypart]");
if (daypart) daypart.textContent = partOfDay(new Date().getHours());

const slot = document.querySelector<HTMLButtonElement>("[data-slot]");
const drum = slot?.querySelector<HTMLElement>(".reel-drum");
const faces = slot ? [...slot.querySelectorAll<HTMLElement>(".reel-face")] : [];

if (slot && drum && faces.length) {
  const N = faces.length;
  const STEP = 360 / N;
  const mod = (a: number, n: number) => ((a % n) + n) % n;

  // The drum's rotation in degrees. Face i sits at i·STEP around the drum, so
  // the face at the front is the one where angle + i·STEP ≡ 0.
  let angle = 0;
  let front = 0;
  let current = faces[0].textContent?.trim() || "nice";
  let spinning = false;

  const pick = (exclude: Set<string>) => {
    const pool = adjectives.filter((a) => !exclude.has(a));
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const setDrum = (deg: number, transition: string) => {
    drum.style.transition = transition;
    drum.style.setProperty("--angle", `${deg}deg`);
  };

  const label = (word: string) => slot.setAttribute("aria-label", `${word} — spin for another adjective`);

  // Fill every facet so the reel never shows blanks once JS is running.
  const fill = (keep: Set<number>) => {
    const used = new Set(faces.filter((_, i) => keep.has(i)).map((f) => f.textContent?.trim() ?? ""));
    faces.forEach((f, i) => {
      if (keep.has(i)) return;
      const w = pick(used);
      used.add(w);
      f.textContent = w;
    });
  };

  const spin = ({ ms, turns }: { ms: number; turns: number }) => {
    if (spinning) return;
    const target = pick(new Set([current]));

    if (reduceMotion.matches) {
      faces[front].textContent = target;
      current = target;
      label(target);
      return;
    }

    spinning = true;
    slot.classList.add("is-spinning");
    // Land a few facets on from the current one, after `turns` full turns.
    const advance = 3 + Math.floor(Math.random() * (N - 4)); // never 0 → always a different facet
    const landing = mod(front + advance, N);
    // Re-letter the facets out of view (keep the visible front ± 1), then
    // put the result on the landing facet.
    fill(new Set([front, mod(front + 1, N), mod(front - 1, N)]));
    faces[landing].textContent = target;

    angle -= turns * 360 + advance * STEP; // roll so facets move upward
    setDrum(angle, `transform ${ms}ms cubic-bezier(0.15, 0.7, 0.22, 1.05)`);
    drum.addEventListener(
      "transitionend",
      () => {
        front = landing;
        current = target;
        label(target);
        slot.classList.remove("is-spinning");
        spinning = false;
      },
      { once: true },
    );
  };

  fill(new Set([0]));
  setDrum(angle, "none");
  slot.classList.add("is-ready");
  slot.addEventListener("click", () => spin(RESPIN));

  // First spin when the Intro arrives (once).
  const intro = slot.closest<HTMLElement>("section.page");
  let spunOnce = false;
  const firstSpin = () => {
    if (spunOnce) return;
    spunOnce = true;
    window.setTimeout(() => spin(FIRST_SPIN), reduceMotion.matches ? 0 : FIRST_SPIN_DELAY);
  };
  if (intro && "IntersectionObserver" in window) {
    intro.addEventListener("page:active", firstSpin, { once: true });
    if (intro.classList.contains("is-active")) firstSpin();
  } else {
    firstSpin();
  }
}
