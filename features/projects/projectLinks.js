import { selectAll } from '../../utils/dom.js';

export function initProjectLinks() {
    selectAll('.project-link').forEach(card => {
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-url');
            if (url) window.location.href = url;
        });
    });
}
