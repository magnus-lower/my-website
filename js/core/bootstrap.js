(() => {
    const DEFAULT_LANGUAGE = 'no';
    const language = localStorage.getItem('language') || DEFAULT_LANGUAGE;
    localStorage.setItem('language', language);
    document.documentElement.lang = language;

    const prefersDarkMode = localStorage.getItem('darkMode') === 'true';
    if (prefersDarkMode) {
        document.documentElement.classList.add('dark-mode');
    }
})();
