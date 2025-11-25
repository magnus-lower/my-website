export function initializeApp(initializers) {
    document.addEventListener('DOMContentLoaded', () => {
        initializers.forEach(init => init());
    });
}
