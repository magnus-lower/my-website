import { selectAll } from "../../utils/dom.js";

/**
 * Make project cards clickable while respecting existing anchor semantics.
 */
export function initProjectLinks() {
  selectAll(".project-link").forEach((card) => {
    card.addEventListener("click", () => {
      const url = card.getAttribute("data-url");
      if (url) window.location.href = url;
    });
  });
}
