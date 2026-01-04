import { select } from "../../utils/dom.js";

export function initHeaderVisibility() {
  const header = select(".main-header");
  if (!header) return;

  const nav = select("nav");
  const hamburger = select(".hamburger");
  let lastScrollTop = 0;
  let ticking = false;
  let showTimer = null;
  const hideThreshold = 12;
  const showThreshold = 1;
  const showDelay = 160;

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

  const showHeader = () => {
    header.classList.remove("main-header--hidden");
  };

  const hideHeader = () => {
    header.classList.add("main-header--hidden");
  };

  const clearShowTimer = () => {
    if (showTimer) {
      clearTimeout(showTimer);
      showTimer = null;
    }
  };

  const scheduleShow = () => {
    if (showTimer) return;
    showTimer = setTimeout(() => {
      showHeader();
      showTimer = null;
    }, showDelay);
  };

  const update = () => {
    const currentScrollTop = getScrollTop();
    const menuOpen =
      nav?.classList.contains("open") ||
      hamburger?.classList.contains("active");
    const headerHeight = header.offsetHeight || 0;
    const isHiddenNow = header.classList.contains("main-header--hidden");

    if (menuOpen) {
      clearShowTimer();
      showHeader();
      lastScrollTop = currentScrollTop;
      ticking = false;
      return;
    }

    if (currentScrollTop <= headerHeight) {
      clearShowTimer();
      showHeader();
      lastScrollTop = currentScrollTop;
      ticking = false;
      return;
    }

    if (currentScrollTop > lastScrollTop + hideThreshold) {
      clearShowTimer();
      if (!isHiddenNow) hideHeader();
    } else if (currentScrollTop < lastScrollTop - showThreshold) {
      scheduleShow();
    }

    lastScrollTop = currentScrollTop;
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("scroll", onScroll, {
    passive: true,
    capture: true,
  });

  window.addEventListener("resize", () => {
    lastScrollTop = getScrollTop();
    if (getScrollTop() <= header.offsetHeight) showHeader();
  });

  update();
}
