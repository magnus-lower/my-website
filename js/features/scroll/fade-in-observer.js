import { selectAll } from "../../utils/dom.js";

/**
 * Activate lazy fade-in animations when elements enter the viewport.
 */
export function initFadeInObserver() {
  const fadeInElements = selectAll(".fade-in");
  if (!("IntersectionObserver" in window) || fadeInElements.length === 0)
    return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const delay = selectAll(".fade-in").indexOf(entry.target) * 0.1;
        entry.target.style.transitionDelay = `${delay}s`;
        entry.target.classList.add("visible");

        if (document.documentElement.classList.contains("dark-mode")) {
          entry.target.classList.add("dark-mode");
        }

        setTimeout(() => {
          entry.target.style.transitionDelay = "0s";
        }, 1000);

        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.1 },
  );

  fadeInElements.forEach((element) => observer.observe(element));
}
