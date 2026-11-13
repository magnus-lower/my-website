import { select } from "../../utils/dom.js";

/**
 * Enhance the contact form with async submission feedback.
 */
export function initContactForm() {
  const contactForm = select("#contact-form");
  const confirmationMessage = select("#confirmation");
  const messageField = select("#message");

  if (!contactForm || !confirmationMessage) return;

  const submitButton = contactForm.querySelector('[type="submit"]');
  const successText = { ...confirmationMessage.dataset };
  let confirmationTimer;

  const resizeMessageField = () => {
    if (!messageField) return;

    messageField.style.height = "auto";
    messageField.style.height = `${messageField.scrollHeight}px`;
  };

  if (messageField) {
    messageField.addEventListener("input", resizeMessageField);
    window.addEventListener("resize", resizeMessageField);
    contactForm.addEventListener("reset", () => {
      requestAnimationFrame(resizeMessageField);
    });
    resizeMessageField();
  }

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (contactForm.getAttribute("aria-busy") === "true") return;

    clearTimeout(confirmationTimer);
    confirmationMessage.style.display = "none";
    contactForm.setAttribute("aria-busy", "true");
    submitButton.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Contact submission failed");

      Object.assign(confirmationMessage.dataset, successText);
      confirmationMessage.classList.remove("is-error");
      confirmationTimer = setTimeout(() => {
        contactForm.reset();
        confirmationMessage.style.display = "none";
      }, 3000);
    } catch {
      confirmationMessage.dataset.en = "An error occurred. Please try again.";
      confirmationMessage.dataset.no = "Det oppstod en feil. Prøv igjen.";
      confirmationMessage.classList.add("is-error");
    } finally {
      confirmationMessage.textContent =
        confirmationMessage.dataset[
          document.documentElement.lang === "no" ? "no" : "en"
        ];
      confirmationMessage.style.display = "block";
      contactForm.removeAttribute("aria-busy");
      submitButton.disabled = false;
    }
  });
}
