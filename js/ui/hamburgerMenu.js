import { $, $$, toggleClass } from '../core/dom.js';

function closeMenu(button, nav) {
    toggleClass(nav, 'open', false);
    toggleClass(document.body, 'menu-open', false);
    toggleClass(button, 'active', false);
    document.body.style.overflow = '';
}

function toggleMenu(button, nav) {
    const isOpen = nav.classList.contains('open');

    if (isOpen) {
        closeMenu(button, nav);
    } else {
        toggleClass(nav, 'open', true);
        toggleClass(document.body, 'menu-open', true);
        toggleClass(button, 'active', true);
        document.body.style.overflow = 'hidden';
    }
}

export function initHamburgerMenu() {
    const button = $('.hamburger');
    const nav = $('nav');

    if (!button || !nav) return;

    button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleMenu(button, nav);
    });

    document.addEventListener('click', (event) => {
        if (!nav.classList.contains('open')) return;
        const clickedOutside = !nav.contains(event.target) && !button.contains(event.target);
        if (clickedOutside) {
            closeMenu(button, nav);
        }
    });

    $$('nav .nav-list a').forEach((link) => {
        link.addEventListener('click', () => closeMenu(button, nav));
    });
}
