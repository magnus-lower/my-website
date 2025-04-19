export function initScrollToTop() {
    const scrollButton = document.getElementById('scroll-top');
    if (!scrollButton) return;

    window.addEventListener('scroll', () => {
        scrollButton.style.display = window.scrollY > 300 ? "block" : "none";
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}