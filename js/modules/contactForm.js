export function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const confirmationMessage = document.getElementById('confirmation');
    if (!contactForm || !confirmationMessage) return;

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Show confirmation message
        confirmationMessage.style.display = 'block';

        // Submit the form data
        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        })
            .then(() => {
                // Reset form after successful submission
                setTimeout(() => {
                    contactForm.reset();
                    confirmationMessage.style.display = 'none';
                }, 3000);
            })
            .catch(error => console.error('Error:', error));
    });
}