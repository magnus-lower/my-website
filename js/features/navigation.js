import { addClass, getElement, getElements, removeClass } from '../core/dom.js';
import { onClickOutside } from '../core/events.js';

const closeMenu = (nav, button) => {
    removeClass(nav, 'open');
    removeClass(document.body, 'menu-open');
    removeClass(button, 'active');
    document.body.style.overflow = '';
};

const openMenu = (nav, button) => {
    addClass(nav, 'open');
    addClass(document.body, 'menu-open');
    addClass(button, 'active');
    document.body.style.overflow = 'hidden';
};

const toggleMenu = (nav, button) => {
    const isOpen = nav.classList.contains('open');
    if (isOpen) {
        closeMenu(nav, button);
    } else {
        openMenu(nav, button);
    }
};

export const initHamburgerMenu = () => {
    const button = getElement('.hamburger');
    const nav = getElement('nav');
    if (!button || !nav) return;

    button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleMenu(nav, button);
    });

    onClickOutside([nav, button], () => closeMenu(nav, button));

    getElements('.nav-list a').forEach((link) => {
        link.addEventListener('click', () => closeMenu(nav, button));
    });
};

export const highlightActiveNavLink = () => {
    const links = getElements('nav ul li a');
    let currentPath = window.location.pathname;

    if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('index.html')) {
        currentPath = 'index.html';
    }

    links.forEach((link) => {
        const linkPath = link.getAttribute('href');
        if (!linkPath || linkPath.startsWith('http')) return;

        if (currentPath.includes(linkPath)) {
            addClass(link, 'active');
        } else {
            removeClass(link, 'active');
        }
    });
};
