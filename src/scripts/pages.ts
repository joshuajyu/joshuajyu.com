// The home page is a stack of full-screen "pages" (`section.page`) that the
// browser scroll-snaps between. Whichever page crosses the middle of the
// viewport is the active one: it gets `.is-active` (its `[data-reveal]`
// children animate in — see global.css), and the section stepper moves to it
// (step `data-state` drives the dot, line fill and blurb expansion).
// Leaving a page removes the class so it animates again on return.
const pages = [...document.querySelectorAll<HTMLElement>("section.page")];
const steps = [...document.querySelectorAll<HTMLElement>("[data-stepper] li[data-step]")];

const activate = (page: HTMLElement) => {
  for (const p of pages) p.classList.toggle("is-active", p === page);

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
