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

  if (!settingsToggle || !settingsDropdown) return;

  const setDropdownVisibility = (isVisible) => {
    settingsDropdown.classList.toggle("visible", isVisible);
    settingsToggle.setAttribute("aria-expanded", String(isVisible));
    settingsDropdown.setAttribute("aria-hidden", String(!isVisible));
  };

  const closeNav = () => {
    if (!nav || !hamburger) return;
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
    hamburger.classList.remove("active");
    document.body.style.overflow = "";
    hamburger.setAttribute("aria-expanded", "false");
    nav.setAttribute("aria-hidden", "true");
  };

  settingsToggle.setAttribute("aria-expanded", "false");
  settingsDropdown.setAttribute("aria-hidden", "true");

  settingsToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = !settingsDropdown.classList.contains("visible");
    if (willOpen) {
      closeNav();
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
