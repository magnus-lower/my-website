import { getElements } from '../core/dom.js';

export const initProjectLinks = () => {
    getElements('.project-link').forEach((card) => {
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-url');
            if (url) window.location.href = url;
        });
    });
};
