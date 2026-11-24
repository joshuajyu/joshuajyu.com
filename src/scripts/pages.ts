// The home page is a stack of full-screen "pages" (`section.page`) that the
// browser scroll-snaps between. Whichever page crosses the middle of the
// viewport is the active one: it gets `.is-active` (its `[data-reveal]`
// children animate in — see global.css), and the section stepper moves to it
// (step `data-state` drives the dot, line fill and blurb expansion).
// Leaving a page removes the class so it animates again on return.
// Every other page gets `data-side="above"|"below"` (where it sits relative to
// the active one); the active page keeps the side it was entered from, so the
// reveal runs the other way round when scrolling back up (global.css).
// Each change also fires `page:active` / `page:inactive` on the section, for
// effects that need to start on arrival (e.g. the typewriter in quotes.ts).
const pages = [...document.querySelectorAll<HTMLElement>("section.page")];
const steps = [...document.querySelectorAll<HTMLElement>("[data-stepper] li[data-step]")];

// The last stagger step on each page, for running the stagger in reverse.
for (const p of pages) {
  const indices = [...p.querySelectorAll<HTMLElement>("[data-reveal]")].map(
    (el) => parseFloat(el.style.getPropertyValue("--reveal-index")) || 0,
  );
  p.style.setProperty("--reveal-last", String(Math.max(0, ...indices)));
}

const activate = (page: HTMLElement) => {
  const at = pages.indexOf(page);
  pages.forEach((p, i) => {
    const wasActive = p.classList.contains("is-active");
    const isActive = p === page;
    if (!isActive) p.dataset.side = i < at ? "above" : "below";
    p.classList.toggle("is-active", isActive);
    if (wasActive !== isActive) p.dispatchEvent(new CustomEvent(isActive ? "page:active" : "page:inactive"));
  });

  const current = steps.findIndex((li) => li.dataset.step === page.id);
  if (current === -1) return;
  steps.forEach((li, i) => {
    li.dataset.state = i < current ? "complete" : i === current ? "current" : "upcoming";
    const link = li.querySelector("a");
    if (i === current) link?.setAttribute("aria-current", "step");
    else link?.removeAttribute("aria-current");
  });
};

if (!("IntersectionObserver" in window)) {
  pages.forEach((p) => p.classList.add("is-active"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activate(entry.target as HTMLElement);
      }
    },
    // A zero-height band across the middle of the viewport: exactly one page
    // intersects it at a time, however tall that page is.
    { rootMargin: "-50% 0px -50% 0px" },
  );
  pages.forEach((p) => observer.observe(p));
}
