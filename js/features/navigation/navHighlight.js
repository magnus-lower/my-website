import { selectAll } from '../../utils/dom.js';

export function highlightActiveNavLink() {
    const links = selectAll('nav ul li a');
    let currentPath = window.location.pathname;

    if (currentPath === '/' || currentPath.endsWith('/index.html')) {
        currentPath = 'index.html';
    }

    links.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (!linkPath || linkPath.startsWith('http')) return;

        if (currentPath.includes(linkPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
