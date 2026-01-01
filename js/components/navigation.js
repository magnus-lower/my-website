import { select, selectAll } from "../utils/dom.js";

/**
 * Initialize the mobile navigation toggle and close interactions.
 */
export function initNavigation() {
  const hamburger = select(".hamburger");
  const nav = select("nav");
  const navLinks = selectAll(".nav-list a");

  if (!hamburger || !nav) return;

  const isDesktopView = window.matchMedia("(min-width: 769px)").matches;

  const setAriaState = (isOpen) => {
    hamburger.setAttribute("aria-expanded", String(isOpen));
    nav.setAttribute("aria-hidden", String(!isOpen));
  };

  setAriaState(isDesktopView);

  const closeMenu = () => {
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
    hamburger.classList.remove("active");
    document.body.style.overflow = "";
    setAriaState(false);
  };

  const toggleMenu = () => {
    const isOpen = nav.classList.contains("open");
    if (isOpen) {
      closeMenu();
    } else {
      nav.classList.add("open");
      document.body.classList.add("menu-open");
      hamburger.classList.add("active");
      document.body.style.overflow = "hidden";
      setAriaState(true);
    }
  };

  hamburger.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleMenu();
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("open")) return;
    if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
      closeMenu();
    }
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
}
