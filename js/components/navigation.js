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

  const desktopView = window.matchMedia("(min-width: 769px)");

  const setSettingsInteractivity = (isOpen) => {
    if (!settingsToggle) return;
    settingsToggle.inert = isOpen && !desktopView.matches;
    if (desktopView.matches) {
      settingsToggle.setAttribute("aria-hidden", "false");
      settingsToggle.tabIndex = 0;
      settingsToggle.style.pointerEvents = "";
      return;
    }
    settingsToggle.setAttribute("aria-hidden", String(isOpen));
    settingsToggle.tabIndex = isOpen ? -1 : 0;
    settingsToggle.style.pointerEvents = "";
    if (isOpen && document.activeElement === settingsToggle) {
      hamburger.focus();
    }
  };

  const setAriaState = (isOpen) => {
    const isMobileOpen = isOpen && !desktopView.matches;
    hamburger.setAttribute("aria-expanded", String(isMobileOpen));
    nav.inert = !desktopView.matches && !isOpen;
    nav.setAttribute("aria-hidden", String(nav.inert));
    hamburger.setAttribute(
      "aria-label",
      isMobileOpen ? "Close menu" : "Open menu",
    );
    setSettingsInteractivity(isOpen);
  };

  const clearMobileNavOverlay = () => {
    document.body.classList.remove("menu-open");
    document.body.style.overflow = "";
    document.querySelectorAll(".nav-overlay").forEach((item) => {
      item.classList.remove("is-visible");
      item.setAttribute("aria-hidden", "true");
    });
  };

  window.__clearMobileNavOverlay = clearMobileNavOverlay;

  const closeSettingsDropdown = () => {
    if (!settingsDropdown) return;
    settingsDropdown.classList.remove("visible");
    settingsDropdown.setAttribute("aria-hidden", "true");
    settingsToggle?.setAttribute("aria-expanded", "false");
    settingsToggle?.classList.remove("is-active");
  };

  setAriaState(false);

  const closeMenu = () => {
    if (!desktopView.matches && nav.contains(document.activeElement)) {
      hamburger.focus();
    }
    nav.classList.remove("open");
    hamburger.classList.remove("active");
    clearMobileNavOverlay();
    setAriaState(false);
  };

  const toggleMenu = () => {
    const isOpen = nav.classList.contains("open");
    if (isOpen) {
      closeMenu();
    } else {
      const settingsVisible = settingsDropdown?.classList.contains("visible");
      if (settingsVisible) {
        closeSettingsDropdown();
      }
      nav.classList.add("open");
      document.body.classList.add("menu-open");
      hamburger.classList.add("active");
      overlay.classList.add("is-visible");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      setAriaState(true);
      navLinks[0]?.focus();
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
    if (desktopView.matches || !nav.classList.contains("open")) return;
    if (event.key === "Escape" && nav.classList.contains("open")) {
      closeMenu();
      hamburger.focus();
    }
    if (event.key === "Tab") {
      const first = hamburger;
      const last = navLinks[navLinks.length - 1] || hamburger;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  desktopView.addEventListener("change", closeMenu);
}
