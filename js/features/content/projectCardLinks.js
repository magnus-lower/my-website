export function initProjectCardLinks() {
    document.querySelectorAll('.project-link').forEach(card => {
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-url');
            if (url) window.location.href = url;
        });
    });
}
