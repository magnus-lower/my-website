import { select, selectAll } from "../utils/dom.js";

/**
 * Initialize the mobile navigation toggle and close interactions.
 */
export function initNavigation() {
  const hamburger = select(".hamburger");
  const nav = select("nav");
  const navLinks = selectAll(".nav-list a");
  let overlay = select(".nav-overlay");
  const settingsToggle = select(".settings-toggle");
  const settingsDropdown = select("#settings-dropdown");

  if (!hamburger || !nav) return;

  const existingCloseButton = select(".nav-close", nav);
  if (existingCloseButton) {
    existingCloseButton.remove();
  }

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    overlay.setAttribute("aria-hidden", "true");
    document.body.append(overlay);
  }

  const isDesktopView = window.matchMedia("(min-width: 769px)").matches;

  const setSettingsInteractivity = (isOpen) => {
    if (!settingsToggle) return;
    if (isDesktopView) {
      settingsToggle.setAttribute("aria-hidden", "false");
      settingsToggle.tabIndex = 0;
      settingsToggle.style.pointerEvents = "";
      return;
    }
    settingsToggle.setAttribute("aria-hidden", String(isOpen));
    settingsToggle.tabIndex = isOpen ? -1 : 0;
    settingsToggle.style.pointerEvents = isOpen ? "none" : "";
    if (isOpen && document.activeElement === settingsToggle) {
      hamburger.focus();
    }
  };

  const setAriaState = (isOpen) => {
    hamburger.setAttribute("aria-expanded", String(isOpen));
    nav.setAttribute("aria-hidden", String(!isOpen));
    hamburger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    setSettingsInteractivity(isOpen);
  };

  const closeSettingsDropdown = () => {
    if (!settingsDropdown) return;
    settingsDropdown.classList.remove("visible");
    settingsDropdown.setAttribute("aria-hidden", "true");
    settingsToggle?.setAttribute("aria-expanded", "false");
  };

  setAriaState(isDesktopView);

  const closeMenu = () => {
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
    hamburger.classList.remove("active");
    overlay.classList.remove("is-visible");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setAriaState(false);
  };

  const toggleMenu = () => {
    const isOpen = nav.classList.contains("open");
    if (isOpen) {
      closeMenu();
    } else {
      closeSettingsDropdown();
      nav.classList.add("open");
      document.body.classList.add("menu-open");
      hamburger.classList.add("active");
      overlay.classList.add("is-visible");
      overlay.setAttribute("aria-hidden", "false");
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

  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      closeMenu();
    }
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
}
