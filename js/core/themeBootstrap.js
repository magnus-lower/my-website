(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (!isDarkMode) return;

    document.documentElement.classList.add('dark-mode');

    if (document.body) {
        document.body.classList.add('dark-mode');
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('dark-mode');
        });
    }
})();
