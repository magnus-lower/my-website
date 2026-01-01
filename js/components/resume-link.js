import { select } from "../utils/dom.js";

function updateResumeLink(language) {
  const resumeLink = select("#resume-link");
  if (!resumeLink) return;

  const label = resumeLink.querySelector(".resume-text");
  const fileName = language === "no" ? "norwegian_cv.pdf" : "english_cv.pdf";

  resumeLink.href = `assets/${fileName}`;

  if (label) {
    label.textContent = language === "no" ? "CV" : "Resume";
  }
}

/**
 * Initialize the resume anchor to point at the correct language asset.
 * @param {string} language Current language code.
 * @returns {{refresh: function(string): void}}
 */
export function initResumeLink(language) {
  const resumeLink = select("#resume-link");
  if (!resumeLink) {
    return { refresh: () => {} };
  }

  resumeLink.removeAttribute("download");
  resumeLink.setAttribute("target", "_blank");

  updateResumeLink(language);

  return {
    refresh: updateResumeLink,
  };
}
