import { on, qs, qsa, toggleAriaExpanded } from './dom.js';

function closeMenu(nav, trigger) {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    if (trigger) {
        trigger.classList.remove('active');
        toggleAriaExpanded(trigger, false);
    }
    document.body.style.overflow = '';
}

function openMenu(nav, trigger) {
    nav.classList.add('open');
    document.body.classList.add('menu-open');
    if (trigger) {
        trigger.classList.add('active');
        toggleAriaExpanded(trigger, true);
    }
    document.body.style.overflow = 'hidden';
}

export function initNavigation() {
    const menuButton = qs('.hamburger');
    const nav = qs('nav');

    if (menuButton && nav) {
        on(menuButton, 'click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            const isOpen = nav.classList.contains('open');
            isOpen ? closeMenu(nav, menuButton) : openMenu(nav, menuButton);
        });

        document.addEventListener('click', (event) => {
            if (!nav.classList.contains('open')) return;
            const target = event.target;
            if (!nav.contains(target) && !menuButton.contains(target)) {
                closeMenu(nav, menuButton);
            }
        });

        qsa('.nav-list a').forEach((link) => {
            on(link, 'click', () => closeMenu(nav, menuButton));
        });
    }

    setActiveNavLink();
}

function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
    qsa('.nav-link').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http')) return;

        const isActive = currentPath === href || (currentPath === '' && href === 'index.html');
        if (isActive) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}
