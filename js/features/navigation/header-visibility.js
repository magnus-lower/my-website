import { on, select } from "../../utils/dom.js";

export function initHeaderVisibility() {
  const header = select(".main-header");
  if (!header) return;

  const nav = select("nav");
  const hamburger = select(".hamburger");
  let lastScrollY = window.scrollY;
  let ticking = false;
  let isHidden = false;
  let showTimer = null;
  const hideThreshold = 10;
  const showDelay = 160;

  const showHeader = () => {
    header.classList.remove("main-header--hidden");
    isHidden = false;
  };

  const hideHeader = () => {
    header.classList.add("main-header--hidden");
    isHidden = true;
  };

  const clearShowTimer = () => {
    if (showTimer) {
      clearTimeout(showTimer);
      showTimer = null;
    }
  };

  const scheduleShow = () => {
    if (!isHidden || showTimer) return;
    showTimer = setTimeout(() => {
      showHeader();
      showTimer = null;
    }, showDelay);
  };

  const update = () => {
    const currentScrollY = window.scrollY;
    const menuOpen = nav?.classList.contains("open") || hamburger?.classList.contains("active");
    const headerHeight = header.offsetHeight || 0;

    if (menuOpen || currentScrollY <= headerHeight) {
      clearShowTimer();
      showHeader();
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    if (currentScrollY > lastScrollY + hideThreshold) {
      clearShowTimer();
      if (!isHidden) hideHeader();
    } else if (currentScrollY < lastScrollY) {
      scheduleShow();
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
    if (window.scrollY <= header.offsetHeight) showHeader();
  });
}
