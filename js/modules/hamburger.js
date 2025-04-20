export function initHamburger() {
    const btn = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
        nav.classList.toggle('open');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on navigation links
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            document.body.classList.remove('menu-open');
        });
    });
}