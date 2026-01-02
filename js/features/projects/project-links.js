import { selectAll } from "../../utils/dom.js";

/**
 * Make project cards clickable while respecting existing anchor semantics.
 */
export function initProjectLinks() {
  selectAll(".project-link").forEach((card) => {
    const githubUrl = card.getAttribute("data-github");
    const liveUrl = card.getAttribute("data-live");

    if (githubUrl || liveUrl) {
      const actions = document.createElement("div");
      actions.className = "project-actions";
      const language = document.documentElement.lang || "en";

      if (githubUrl) {
        actions.appendChild(
          createProjectAction({
            href: githubUrl,
            labelEn: "Source",
            labelNo: "Kildekode",
            language,
            variant: "secondary",
          })
        );
      }

      if (liveUrl) {
        actions.appendChild(
          createProjectAction({
            href: liveUrl,
            labelEn: "Live demo",
            labelNo: "Live demo",
            language,
            variant: "primary",
          })
        );
      }

      card.appendChild(actions);
    }
  });
}

function createProjectAction({ href, labelEn, labelNo, language, variant }) {
  const link = document.createElement("a");
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.className =
    variant === "secondary" ? "cta-button secondary" : "cta-button";
  link.setAttribute("data-en", labelEn);
  link.setAttribute("data-no", labelNo);
  link.textContent = language === "no" ? labelNo : labelEn;
  return link;
}
