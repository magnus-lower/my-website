(() => {
    const storedLanguage = localStorage.getItem('language');
    if (!storedLanguage) {
        localStorage.setItem('language', 'no');
    }

    const language = localStorage.getItem('language');
    document.documentElement.lang = language;
})();
