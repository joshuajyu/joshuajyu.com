// Typewriter effect for the pull quotes (`figure[data-quote]`, Quote.astro).
//
// The first time a quote's page becomes active (`page:active` from pages.ts),
// once the rest of the page has finished revealing, the quote is typed out
// left to right with a blinking caret; the citation then fades in. On later
// visits the quote is simply there.
//
// How it stays solid:
//   • Every character is laid out from the start (each in a span at opacity 0)
//     and revealed in turn, so wrapping lines never reflow or jump.
//   • Screen readers get the full text at once from a visually hidden copy;
//     the per-character spans are aria-hidden.
//   • Reduced motion or no JavaScript: nothing is changed, the quote just shows.

const MS_PER_CHAR = 24;
const JITTER = 9; // ± ms, so it reads as typing rather than a ticker
const PAUSE_SHORT = 120; // after , ; : —
const PAUSE_LONG = 220; // after . ! ?
const CARET_LINGER = 1400; // caret keeps blinking this long after the last character

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

interface Typer {
  start(): void;
  stop(): void;
}

function setUp(figure: HTMLElement): Typer | undefined {
  const quote = figure.querySelector("blockquote");
  if (!quote) return;
  const text = quote.textContent?.replace(/\s+/g, " ").trim() ?? "";
  if (!text) return;

  // Accessible copy + per-character visual copy.
  const srCopy = document.createElement("span");
  srCopy.className = "sr-only";
  srCopy.textContent = text;
  const visual = document.createElement("span");
  visual.setAttribute("aria-hidden", "true");
  const chars = Array.from(text).map((ch) => {
    const span = document.createElement("span");
    span.className = "tw-char";
    span.textContent = ch;
    visual.append(span);
    return span;
  });
  quote.replaceChildren(srCopy, visual);
  figure.classList.add("tw", "tw-pending");

  let timer = 0;
  let typed = 0;
  let done = false;

  const delayAfter = (ch: string) => {
    if (/[.!?]/.test(ch)) return PAUSE_LONG;
    if (/[,;:—]/.test(ch)) return PAUSE_SHORT;
    return MS_PER_CHAR + (Math.random() * 2 - 1) * JITTER;
  };

  const reset = () => {
    clearTimeout(timer);
    typed = 0;
    for (const c of chars) c.classList.remove("is-typed", "is-caret");
    figure.classList.add("tw-pending");
  };

  const finish = () => {
    done = true;
    figure.classList.remove("tw-pending"); // citation fades in
    timer = window.setTimeout(() => chars.at(-1)?.classList.remove("is-caret"), CARET_LINGER);
  };

  const tick = () => {
    chars[typed - 1]?.classList.remove("is-caret");
    const c = chars[typed];
    c.classList.add("is-typed", "is-caret");
    typed += 1;
    if (typed === chars.length) finish();
    else timer = window.setTimeout(tick, delayAfter(c.textContent ?? ""));
  };

  // Start once the rest of the page has revealed: the figure's own reveal
  // (stagger delay + 650ms transition, see global.css) plus a beat.
  const index = parseFloat(getComputedStyle(figure).getPropertyValue("--reveal-index")) || 0;
  const startDelay = 100 + index * 80 + 650 + 250 + (Number(figure.dataset.quoteDelay) || 0);

  return {
    start() {
      if (done) return;
      reset();
      timer = window.setTimeout(tick, startDelay);
    },
    stop() {
      if (!done) reset(); // interrupted: type again from the start next time
    },
  };
}

// pages.ts needs IntersectionObserver to fire page:active; without it, leave
// the quotes untouched rather than hidden.
if (!reduceMotion.matches && "IntersectionObserver" in window) {
  for (const figure of document.querySelectorAll<HTMLElement>("figure[data-quote]")) {
    const page = figure.closest<HTMLElement>("section.page");
    const typer = setUp(figure);
    if (!page || !typer) continue;
    page.addEventListener("page:active", () => typer.start());
    page.addEventListener("page:inactive", () => typer.stop());
    if (page.classList.contains("is-active")) typer.start();
  }
}
