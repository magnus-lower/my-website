import { select, selectAll } from "../utils/dom.js";

/**
 * Initialize the mobile navigation toggle and close interactions.
 */
export function initNavigation() {
  const hamburger = select(".hamburger");
  const nav = select("nav");
  const navLinks = selectAll(".nav-list a");
  const settingsToggle = select(".settings-toggle");
  const settingsDropdown = select("#settings-dropdown");

  if (!hamburger || !nav) return;

  const isDesktopView = window.matchMedia("(min-width: 769px)").matches;
  const isMobileView = window.matchMedia("(max-width: 768px)");
  const backdrop = document.createElement("div");
  backdrop.className = "nav-backdrop";
  backdrop.setAttribute("aria-hidden", "true");
  document.body.appendChild(backdrop);

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "nav-close";
  closeButton.setAttribute("aria-label", "Close menu");
  closeButton.textContent = "×";
  nav.insertBefore(closeButton, nav.firstChild);

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

  const closeSettings = () => {
    if (!settingsToggle || !settingsDropdown) return;
    settingsDropdown.classList.remove("visible");
    settingsToggle.setAttribute("aria-expanded", "false");
    settingsDropdown.setAttribute("aria-hidden", "true");
  };

  const toggleMenu = () => {
    const isOpen = nav.classList.contains("open");
    if (isOpen) {
      closeMenu();
    } else {
      if (isMobileView.matches) {
        closeSettings();
      }
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

  closeButton.addEventListener("click", closeMenu);

  backdrop.addEventListener("click", closeMenu);

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("open")) return;
    if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (nav.classList.contains("open")) {
      closeMenu();
    }
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
}
