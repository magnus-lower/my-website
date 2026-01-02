import { selectAll } from "../../utils/dom.js";

function createActionLink({ href, text, variantClass }) {
  const link = document.createElement("a");
  link.className = `project-action-btn ${variantClass}`;
  link.href = href;
  link.textContent = text;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  return link;
}

export function initProjectLinks() {
  selectAll(".project-item").forEach((card) => {
    const github = card.dataset.github?.trim();
    const live = card.dataset.live?.trim();

    if (!github && !live) return;

    const actions = document.createElement("div");
    actions.className = "project-actions";

    if (github) {
      actions.append(
        createActionLink({
          href: github,
          text: "Kildekode",
          variantClass: "project-action-github",
        })
      );
    }

    if (live) {
      actions.append(
        createActionLink({
          href: live,
          text: "Live demo",
          variantClass: "project-action-live",
        })
      );
    }

    card.append(actions);
  });
}
