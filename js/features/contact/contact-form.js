import { select } from '../../utils/dom.js';

/**
 * Enhance the contact form with async submission feedback.
 */
export function initContactForm() {
    const contactForm = select('#contact-form');
    const confirmationMessage = select('#confirmation');

    if (!contactForm || !confirmationMessage) return;

    contactForm.addEventListener('submit', event => {
        event.preventDefault();

        confirmationMessage.style.display = 'block';

        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' },
        })
            .then(() => {
                setTimeout(() => {
                    contactForm.reset();
                    confirmationMessage.style.display = 'none';
                }, 3000);
            })
            .catch(() => {
                confirmationMessage.textContent = 'An error occurred. Please try again.';
            });
    });
}
