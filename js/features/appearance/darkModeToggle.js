export function initDarkModeToggle() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;

    const themeModeText = document.getElementById('theme-mode-text');

    const updateLabelText = (isDark) => {
        if (!themeModeText) return;

        const language = localStorage.getItem('language') || 'en';
        themeModeText.setAttribute('data-en', isDark ? 'Dark Mode' : 'Light Mode');
        themeModeText.setAttribute('data-no', isDark ? 'Mørk modus' : 'Lys modus');

        themeModeText.textContent = language === 'no'
            ? themeModeText.getAttribute('data-no')
            : themeModeText.getAttribute('data-en');

        const labelIcon = themeModeText.previousElementSibling;
        if (labelIcon) {
            labelIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
        }
    };

    const applyThemeToContent = (enabled) => {
        document.documentElement.classList.toggle('dark-mode', enabled);
        document.body.classList.toggle('dark-mode', enabled);
        document.querySelectorAll('section, .project-item, .hero, .projects-container')
            .forEach(element => element.classList.toggle('dark-mode', enabled));

        const scrollButton = document.getElementById('scroll-top');
        if (scrollButton) scrollButton.classList.toggle('dark-mode', enabled);
    };

    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    updateLabelText(isDarkMode);
    applyThemeToContent(isDarkMode);
    darkModeToggle.checked = isDarkMode;

    darkModeToggle.addEventListener('change', () => {
        const enabled = darkModeToggle.checked;
        updateLabelText(enabled);
        applyThemeToContent(enabled);
        localStorage.setItem('darkMode', enabled.toString());
        document.dispatchEvent(new CustomEvent('themeChange', { detail: { darkMode: enabled } }));
    });
}
