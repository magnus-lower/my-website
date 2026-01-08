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
  const overlay = select(".nav-overlay");

  if (!settingsToggle || !settingsDropdown) return;

  const updateDropdownPosition = () => {
    const toggleRect = settingsToggle.getBoundingClientRect();
    const dropdownRect = settingsDropdown.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const horizontalPadding = 12;
    const verticalPadding = 12;
    const verticalOffset = window.matchMedia("(max-width: 768px)").matches
      ? 19
      : 0;

    let left = toggleRect.right - dropdownRect.width;
    let top = toggleRect.bottom + verticalOffset;

    if (left < horizontalPadding) {
      left = horizontalPadding;
    } else if (left + dropdownRect.width > viewportWidth - horizontalPadding) {
      left = Math.max(horizontalPadding, viewportWidth - dropdownRect.width - horizontalPadding);
    }

    if (top + dropdownRect.height > viewportHeight - verticalPadding) {
      top = Math.max(verticalPadding, viewportHeight - dropdownRect.height - verticalPadding);
    }

    settingsDropdown.style.setProperty("--settings-dropdown-left", `${Math.round(left)}px`);
    settingsDropdown.style.setProperty("--settings-dropdown-top", `${Math.round(top)}px`);
  };

  const setDropdownVisibility = (isVisible) => {
    settingsDropdown.classList.toggle("visible", isVisible);
    settingsToggle.setAttribute("aria-expanded", String(isVisible));
    settingsDropdown.setAttribute("aria-hidden", String(!isVisible));
    if (isVisible) {
      requestAnimationFrame(updateDropdownPosition);
    }
  };

  settingsToggle.setAttribute("aria-expanded", "false");
  settingsDropdown.setAttribute("aria-hidden", "true");

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
      overlay?.classList.remove("is-visible");
      overlay?.setAttribute("aria-hidden", "true");
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

  window.addEventListener("resize", () => {
    if (settingsDropdown.classList.contains("visible")) {
      updateDropdownPosition();
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
