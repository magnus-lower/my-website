import { select, selectAll } from '../utils/dom.js';

export function initNavigation() {
    const hamburger = select('.hamburger');
    const nav = select('nav');
    const navLinks = selectAll('.nav-list a');

    if (!hamburger || !nav) return;

    const closeMenu = () => {
        nav.classList.remove('open');
        document.body.classList.remove('menu-open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    };

    const toggleMenu = () => {
        const isOpen = nav.classList.contains('open');
        if (isOpen) {
            closeMenu();
        } else {
            nav.classList.add('open');
            document.body.classList.add('menu-open');
            hamburger.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    hamburger.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        toggleMenu();
    });

    document.addEventListener('click', event => {
        if (!nav.classList.contains('open')) return;
        if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
            closeMenu();
        }
    });

    navLinks.forEach(link => link.addEventListener('click', closeMenu));
}
