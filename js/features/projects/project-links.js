import { selectAll } from "../../utils/dom.js";

const CARD_SELECTOR = ".project-item";
const BUTTON_SELECTORS = {
  source: ".project-card__btn--source",
  demo: ".project-card__btn--demo",
};

function openUrl(url) {
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Attach project card action buttons without making the entire card clickable.
 */
export function initProjectLinks() {
  selectAll(CARD_SELECTOR).forEach((card) => {
    const githubUrl = card.dataset.githubUrl;
    const demoUrl = card.dataset.demoUrl;
    const sourceButton = card.querySelector(BUTTON_SELECTORS.source);
    const demoButton = card.querySelector(BUTTON_SELECTORS.demo);

    if (sourceButton) {
      sourceButton.addEventListener("click", (event) => {
        event.stopPropagation();
        openUrl(githubUrl);
      });
    }

    if (demoButton) {
      demoButton.addEventListener("click", (event) => {
        event.stopPropagation();
        openUrl(demoUrl);
      });
    }
  });
}
