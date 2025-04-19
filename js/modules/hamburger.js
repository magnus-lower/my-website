export function initHamburger() {
    const btn = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', () => nav.classList.toggle('open'));
}
