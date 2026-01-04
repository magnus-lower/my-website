import { on, select } from "../../utils/dom.js";

export function initHeaderVisibility() {
  const header = select(".main-header");
  if (!header) return;

  const nav = select("nav");
  const hamburger = select(".hamburger");
  let lastScrollTop = 0;
  let ticking = false;
  let isHidden = false;
  let showTimer = null;
  const hideThreshold = 12;
  const showThreshold = 1;
  const showDelay = 160;

  const getScrollTop = () => {
    if (Number.isFinite(window.scrollY)) return window.scrollY;
    if (Number.isFinite(document.scrollingElement?.scrollTop)) {
      return document.scrollingElement.scrollTop;
    }
    if (Number.isFinite(document.documentElement.scrollTop)) {
      return document.documentElement.scrollTop;
    }
    return 0;
  };

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
    if (showTimer) return;
    showTimer = setTimeout(() => {
      showHeader();
      showTimer = null;
    }, showDelay);
  };

  const update = () => {
    const currentScrollTop = getScrollTop();
    const menuOpen = nav?.classList.contains("open") || hamburger?.classList.contains("active");
    const headerHeight = header.offsetHeight || 0;
    isHidden = header.classList.contains("main-header--hidden");

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
      if (!isHidden) hideHeader();
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

  lastScrollTop = getScrollTop();

  on(window, "scroll", onScroll, { passive: true });
  document.addEventListener("scroll", onScroll, { passive: true, capture: true });

  on(window, "resize", () => {
    lastScrollTop = getScrollTop();
    if (getScrollTop() <= header.offsetHeight) showHeader();
  });
}
