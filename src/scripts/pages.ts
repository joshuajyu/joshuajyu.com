// The home page is a stack of full-screen "pages" (`section.page`) that the
// browser scroll-snaps between. Whichever page crosses the middle of the
// viewport is the active one: it gets `.is-active` (its `[data-reveal]`
// children animate in — see global.css) and its header link gets
// `aria-current`. Leaving a page removes the class so it animates again on
// return.
const pages = [...document.querySelectorAll<HTMLElement>("section.page")];
const navLinks = [...document.querySelectorAll<HTMLAnchorElement>("header nav a[href^='#']")];

const activate = (page: HTMLElement) => {
  for (const p of pages) p.classList.toggle("is-active", p === page);
  for (const link of navLinks) {
    if (link.getAttribute("href") === `#${page.id}`) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  }
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
