import { getStoredDarkModePreference, getStoredLanguage, setStoredDarkModePreference } from './preferences.js';

const DARK_MODE_CLASS = 'dark-mode';
const DARK_MODE_LABEL = {
    en: { dark: 'Dark Mode', light: 'Light Mode' },
    no: { dark: 'Mørk modus', light: 'Lys modus' }
};

export function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;

    const themeModeText = document.getElementById('theme-mode-text');

    const applyDarkModeToSections = (enabled) => {
        document.documentElement.classList.toggle(DARK_MODE_CLASS, enabled);
        document.body.classList.toggle(DARK_MODE_CLASS, enabled);
        document
            .querySelectorAll('section, .project-item, .hero, .projects-container')
            .forEach(el => el.classList.toggle(DARK_MODE_CLASS, enabled));

        const scrollButton = document.getElementById('scroll-top');
        if (scrollButton) {
            scrollButton.classList.toggle(DARK_MODE_CLASS, enabled);
        }
    };

    const updateDarkModeLabel = (isDark) => {
        if (!themeModeText) return;

        const language = getStoredLanguage();
        const translations = DARK_MODE_LABEL[language] || DARK_MODE_LABEL.en;
        const labelIcon = themeModeText.previousElementSibling;

        themeModeText.setAttribute('data-en', isDark ? DARK_MODE_LABEL.en.dark : DARK_MODE_LABEL.en.light);
        themeModeText.setAttribute('data-no', isDark ? DARK_MODE_LABEL.no.dark : DARK_MODE_LABEL.no.light);
        themeModeText.textContent = isDark ? translations.dark : translations.light;

        if (labelIcon) {
            labelIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
        }
    };

    const applyDarkMode = (enabled) => {
        updateDarkModeLabel(enabled);
        applyDarkModeToSections(enabled);
        setStoredDarkModePreference(enabled);
        document.dispatchEvent(new CustomEvent('themeChange', { detail: { darkMode: enabled } }));
    };

    const isDarkMode = getStoredDarkModePreference();
    applyDarkMode(isDarkMode);
    darkModeToggle.checked = isDarkMode;

    darkModeToggle.addEventListener('change', () => applyDarkMode(darkModeToggle.checked));
}