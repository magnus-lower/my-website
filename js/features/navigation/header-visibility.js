import { on, select } from "../../utils/dom.js";

export function initHeaderVisibility() {
  const header = select(".main-header");
  if (!header) return;

  const nav = select("nav");
  const hamburger = select(".hamburger");
  let lastScrollY = window.scrollY;
  let ticking = false;
  let isHidden = false;
  const hideThreshold = 10;
  const showThreshold = 2;

  const showHeader = () => {
    header.classList.remove("main-header--hidden");
    isHidden = false;
  };

  const hideHeader = () => {
    header.classList.add("main-header--hidden");
    isHidden = true;
  };

  const update = () => {
    const currentScrollY = window.scrollY;
    const menuOpen = nav?.classList.contains("open") || hamburger?.classList.contains("active");

    if (currentScrollY <= 0 || menuOpen) {
      showHeader();
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    if (currentScrollY > lastScrollY + hideThreshold && !isHidden) {
      hideHeader();
    } else if (currentScrollY < lastScrollY - showThreshold && isHidden) {
      showHeader();
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  on(
    window,
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );

  on(window, "resize", () => {
    lastScrollY = window.scrollY;
    if (window.scrollY <= 0) showHeader();
  });
}
