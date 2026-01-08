import { select } from "../utils/dom.js";

function setActiveFlag(language) {
  const enFlag = select("#en-flag");
  const noFlag = select("#no-flag");

  if (enFlag) {
    enFlag.style.opacity = language === "en" ? "1" : "0.5";
    enFlag.setAttribute("aria-pressed", language === "en" ? "true" : "false");
  }
  if (noFlag) {
    noFlag.style.opacity = language === "no" ? "1" : "0.5";
    noFlag.setAttribute("aria-pressed", language === "no" ? "true" : "false");
  }
}

/**
 * Wire settings dropdown interactions and language toggle visuals.
 * @param {{onLanguageSelect: function(string): void}} options
 */
export function initSettingsPanel({ onLanguageSelect }) {
  const settingsToggle = select(".settings-toggle");
  const settingsDropdown = select("#settings-dropdown");
  const languageToggle = select("#language-toggle");
  const nav = select("nav");
  const hamburger = select(".hamburger");
  const overlays = document.querySelectorAll(".nav-overlay");

  if (!settingsToggle || !settingsDropdown) return;

  const clearMobileMenuOverlayState = () => {
    if (document.body.classList.contains("menu-open")) {
      document.body.classList.remove("menu-open");
    }
    overlays.forEach((overlay) => {
      if (overlay.classList.contains("is-visible")) {
        overlay.classList.remove("is-visible");
      }
      overlay.setAttribute("aria-hidden", "true");
    });
    if (document.body.style.overflow) {
      document.body.style.overflow = "";
    }
  };

  const setDropdownVisibility = (isVisible) => {
    if (isVisible) {
      settingsToggle.classList.remove("is-active");
      void settingsToggle.offsetWidth;
      clearMobileMenuOverlayState();
    }
    settingsDropdown.classList.toggle("visible", isVisible);
    settingsToggle.setAttribute("aria-expanded", String(isVisible));
    settingsDropdown.setAttribute("aria-hidden", String(!isVisible));
    settingsToggle.classList.toggle("is-active", isVisible);
    if (!isVisible) {
      clearMobileMenuOverlayState();
    }
  };

  settingsToggle.setAttribute("aria-expanded", "false");
  settingsDropdown.setAttribute("aria-hidden", "true");
  settingsToggle.classList.remove("is-active");

  settingsToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = !settingsDropdown.classList.contains("visible");
    if (willOpen && nav?.classList.contains("open")) {
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
      hamburger?.classList.remove("active");
      hamburger?.setAttribute("aria-expanded", "false");
      hamburger?.setAttribute("aria-label", "Open menu");
      nav.setAttribute("aria-hidden", "true");
      overlays.forEach((overlay) => {
        overlay.classList.remove("is-visible");
        overlay.setAttribute("aria-hidden", "true");
      });
      document.body.style.overflow = "";
    }
    setDropdownVisibility(willOpen);
  });

  document.addEventListener("click", (event) => {
    if (
      !settingsDropdown.contains(event.target) &&
      !settingsToggle.contains(event.target)
    ) {
      setDropdownVisibility(false);
    }
  });

  if (languageToggle) {
    const handleLanguageSelection = (target) => {
      if (!target) return;

      const language = target.dataset.lang || target.id.split("-")[0];
      setActiveFlag(language);
      onLanguageSelect?.(language);
    };

    languageToggle.addEventListener("click", (event) => {
      const target = event.target.closest(".flag-icon");
      handleLanguageSelection(target);
    });

    languageToggle.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const target = event.target.closest(".flag-icon");
      if (!target) return;

      event.preventDefault();
      handleLanguageSelection(target);
    });
  }

  setActiveFlag(document.documentElement.lang || "en");
}
