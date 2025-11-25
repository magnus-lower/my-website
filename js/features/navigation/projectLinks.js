import { $$ } from '../../core/dom.js';

export function initProjectLinks() {
    $$('.project-link').forEach((card) => {
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-url');
            if (url) window.location.href = url;
        });
    });
}
