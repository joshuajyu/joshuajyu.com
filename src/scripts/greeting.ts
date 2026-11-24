// Intro greeting: "I hope you have a [adjective] [part of day]!"
//
//   • Part of day — from the viewer's local clock (morning / afternoon /
//     evening / night).
//   • Adjective — a slot-machine reel (Greeting.astro, styles in global.css).
//     It spins the first time the Intro page becomes active (`page:active`
//     from pages.ts), as its sentence fades in, and again whenever the reel
//     button is pressed. A spin builds a strip of random words ending on the
//     result and slides it up with an overshooting ease-out — transform only.
//   • Reduced motion: the result is swapped in instantly, no spin.

import { adjectives, partOfDay } from "../data/greeting";

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

const FIRST_SPIN_DELAY = 650; // ms after the Intro becomes active (sentence mid-fade)
const FIRST_SPIN_MS = 1700;
const RESPIN_MS = 1200;
const STRIP_LENGTH = 14; // words that blur past before the result

const daypart = document.querySelector<HTMLElement>("[data-daypart]");
if (daypart) daypart.textContent = partOfDay(new Date().getHours());

const slot = document.querySelector<HTMLButtonElement>("[data-slot]");
const strip = slot?.querySelector<HTMLElement>(".slot-strip");

if (slot && strip) {
  let current = strip.textContent?.trim() || "nice";
  let spinning = false;

  const pick = (exclude: string) => {
    const pool = adjectives.filter((a) => a !== exclude);
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const render = (words: string[]) => {
    strip.replaceChildren(
      ...words.map((w) => {
        const s = document.createElement("span");
        s.textContent = w;
        return s;
      }),
    );
  };

  const land = (word: string) => {
    current = word;
    render([word]);
    strip.style.transition = "none";
    strip.style.transform = "translateY(0)";
    slot.setAttribute("aria-label", `${word} — spin for another adjective`);
    slot.classList.remove("is-spinning");
    spinning = false;
  };

  // Fixed width: as wide as the longest adjective, so the sentence never
  // reflows mid-spin (measured in the reel's own font).
  const fitWidth = () => {
    const probe = document.createElement("span");
    probe.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap";
    strip.append(probe);
    let max = 0;
    for (const a of adjectives) {
      probe.textContent = a;
      max = Math.max(max, probe.getBoundingClientRect().width);
    }
    probe.remove();
    slot.style.setProperty("--slot-text-w", `${Math.ceil(max)}px`);
  };

  const spin = (duration: number) => {
    if (spinning) return;
    const target = pick(current);
    if (reduceMotion.matches) {
      land(target);
      return;
    }
    spinning = true;
    slot.classList.add("is-spinning");
    const words = [current];
    while (words.length < STRIP_LENGTH) words.push(pick(words[words.length - 1]));
    words.push(target);
    render(words);

    // Start at the current word, then slide to the last one. Each word is one
    // line tall, so the last word sits at -(n-1)/n of the strip's height.
    strip.style.transition = "none";
    strip.style.transform = "translateY(0)";
    void strip.offsetHeight; // commit the start position
    strip.style.transition = `transform ${duration}ms cubic-bezier(0.12, 0.7, 0.24, 1.06)`;
    strip.style.transform = `translateY(${(-(words.length - 1) / words.length) * 100}%)`;
    strip.addEventListener("transitionend", () => land(target), { once: true });
  };

  fitWidth();
  addEventListener("resize", fitWidth);
  slot.classList.add("is-ready");
  slot.addEventListener("click", () => spin(RESPIN_MS));

  // First spin when the Intro arrives (once).
  const intro = slot.closest<HTMLElement>("section.page");
  let spunOnce = false;
  const firstSpin = () => {
    if (spunOnce) return;
    spunOnce = true;
    window.setTimeout(() => spin(FIRST_SPIN_MS), reduceMotion.matches ? 0 : FIRST_SPIN_DELAY);
  };
  if (intro && "IntersectionObserver" in window) {
    intro.addEventListener("page:active", firstSpin, { once: true });
    if (intro.classList.contains("is-active")) firstSpin();
  } else {
    firstSpin();
  }
}
