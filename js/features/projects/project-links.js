import { selectAll } from "../../utils/dom.js";

const CARD_SELECTOR = ".project-item";
const BUTTON_SELECTORS = {
  source: ".project-card__btn--source",
  demo: ".project-card__btn--demo",
};

function openInNewTab(url) {
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
}

function openInSameTab(url) {
  if (!url) return;
  window.location.href = url;
}

export function initProjectLinks() {
  selectAll(CARD_SELECTOR).forEach((card) => {
    const githubUrl = card.dataset.githubUrl;
    const demoUrl = card.dataset.demoUrl;

    const sourceButton = card.querySelector(BUTTON_SELECTORS.source);
    const demoButton = card.querySelector(BUTTON_SELECTORS.demo);

    if (sourceButton) {
      sourceButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openInNewTab(githubUrl);
      });
    }

    if (demoButton) {
      demoButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openInSameTab(demoUrl);
      });
    }
  });
}
