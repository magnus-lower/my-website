import { qsa } from './dom.js';

function navigateToUrl(url) {
    if (url) window.location.href = url;
}

export function initProjectLinks() {
    qsa('.project-link').forEach((card) => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('click', () => navigateToUrl(card.getAttribute('data-url')));
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                navigateToUrl(card.getAttribute('data-url'));
            }
        });
    });
}
