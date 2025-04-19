export function highlightActiveNavLink() {
    let links = document.querySelectorAll("nav ul li a");
    let currentPath = window.location.pathname;

    if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('index.html')) {
        currentPath = 'index.html';
    }

    links.forEach(link => {
        let linkPath = link.getAttribute("href");
        if (linkPath.startsWith("http")) return;

        if (currentPath.includes(linkPath)) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}