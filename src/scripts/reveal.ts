// Adds `.is-visible` to `[data-reveal]` elements as they scroll into view.
// The hidden/visible styles live in global.css and only apply when the
// visitor hasn't requested reduced motion, so this script is safe to run
// unconditionally.
const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");

if (!("IntersectionObserver" in window)) {
  targets.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
  );
  targets.forEach((el) => observer.observe(el));
}
