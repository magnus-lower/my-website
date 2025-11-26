const INDEX_PATH = 'index.html';

export function highlightActiveNavLink() {
    const links = document.querySelectorAll('nav ul li a');
    const normalizedPath = normalizePath(window.location.pathname);

    links.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (!linkPath || linkPath.startsWith('http')) return;

        const isActive = normalizedPath.includes(linkPath);
        link.classList.toggle('active', isActive);
    });
}

function normalizePath(pathname) {
    if (pathname === '/' || pathname === `/${INDEX_PATH}` || pathname.endsWith(INDEX_PATH)) {
        return INDEX_PATH;
    }
    return pathname;
}