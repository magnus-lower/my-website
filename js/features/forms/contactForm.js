import { $, setText } from '../../core/dom.js';

function handleSubmit(event, form, confirmationMessage) {
    event.preventDefault();

    confirmationMessage.style.display = 'block';

    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    })
        .then(() => {
            setTimeout(() => {
                form.reset();
                confirmationMessage.style.display = 'none';
            }, 3000);
        })
        .catch(() => {
            setText(confirmationMessage, 'An error occurred. Please try again.');
        });
}

export function initContactForm() {
    const contactForm = $('#contact-form');
    const confirmationMessage = $('#confirmation');

    if (!contactForm || !confirmationMessage) return;

    contactForm.addEventListener('submit', (event) => handleSubmit(event, contactForm, confirmationMessage));
}
