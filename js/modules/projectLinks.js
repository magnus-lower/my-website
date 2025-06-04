export function initProjectLinks() {
    document.querySelectorAll('.project-link').forEach(card => {
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-url');
            if (url) window.open(url, '_blank');
        });
    });
}
