import { $$ } from '../../core/dom.js';

function normalizePath(pathname) {
    if (pathname === '/' || pathname === '/index.html' || pathname.endsWith('index.html')) {
        return 'index.html';
    }
    return pathname.replace(/^\//, '');
}

export function initNavHighlight() {
    const links = $$("nav ul li a");
    const currentPath = normalizePath(window.location.pathname);

    links.forEach((link) => {
        const linkPath = link.getAttribute('href');
        if (!linkPath || linkPath.startsWith('http')) return;

        const normalizedLink = linkPath.replace(/^\//, '');
        if (currentPath.includes(normalizedLink)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
