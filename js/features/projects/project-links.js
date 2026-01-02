import { selectAll } from "../../utils/dom.js";

function createActionLink({ href, text, variantClass }) {
  const link = document.createElement("a");
  link.className = `project-action-btn project-btn ${variantClass}`;
  if (variantClass === "project-action-live") {
    link.classList.add("primary");
  }
  if (variantClass === "project-action-github") {
    link.classList.add("secondary");
  }
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
          text: "Source Code",
          variantClass: "project-action-github",
        })
      );
    }

    if (live) {
      actions.append(
        createActionLink({
          href: live,
          text: "Live Demo",
          variantClass: "project-action-live",
        })
      );
    }

    const description = card.querySelector("p");
    if (description) {
      description.insertAdjacentElement("afterend", actions);
    } else {
      card.append(actions);
    }
  });
}
