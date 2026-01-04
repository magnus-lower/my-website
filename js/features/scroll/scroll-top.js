import { select } from "../../utils/dom.js";

export function initScrollTop() {
  const button = select("#scroll-top");
  if (!button) return;

  let ticking = false;
  const threshold = 240;

  const getScrollTop = () => {
    if (typeof window.scrollY === "number") return window.scrollY;
    if (typeof window.pageYOffset === "number") return window.pageYOffset;
    if (typeof document.scrollingElement?.scrollTop === "number") {
      return document.scrollingElement.scrollTop;
    }
    if (typeof document.documentElement.scrollTop === "number") {
      return document.documentElement.scrollTop;
    }
    return 0;
  };

  const update = () => {
    const currentScrollTop = getScrollTop();
    if (currentScrollTop > threshold) {
      button.classList.add("is-visible");
    } else {
      button.classList.remove("is-visible");
    }
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  update();
}
