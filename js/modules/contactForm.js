import { qs } from './dom.js';

export function initContactForm() {
    const contactForm = qs('#contact-form');
    const confirmationMessage = qs('#confirmation');
    if (!contactForm || !confirmationMessage) return;

    confirmationMessage.style.display = 'none';

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        confirmationMessage.style.display = 'block';

        try {
            await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { Accept: 'application/json' },
            });

            setTimeout(() => {
                contactForm.reset();
                confirmationMessage.style.display = 'none';
            }, 3000);
        } catch (error) {
            const language = document.documentElement.lang === 'no' ? 'no' : 'en';
            const fallback = language === 'no' ? confirmationMessage.dataset.errorNo : confirmationMessage.dataset.errorEn;
            confirmationMessage.textContent = fallback || 'An error occurred. Please try again.';
        }
    });
}
