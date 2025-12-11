import { saveThemePreference, readPreferences } from './preferences.js';
import { select, selectAll } from '../utils/dom.js';

function toggleThemeClasses(isDarkMode) {
    const surfaces = selectAll('section, .hero, .projects-container, .project-item');
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
    surfaces.forEach(element => element.classList.toggle('dark-mode', isDarkMode));

    const scrollButton = select('#scroll-top');
    if (scrollButton) {
        scrollButton.classList.toggle('dark-mode', isDarkMode);
    }
}

function updateThemeLabel(isDarkMode, language) {
    const themeModeText = select('#theme-mode-text');
    const labelIcon = themeModeText?.previousElementSibling;

    if (!themeModeText) return;

    themeModeText.setAttribute('data-en', isDarkMode ? 'Dark Mode' : 'Light Mode');
    themeModeText.setAttribute('data-no', isDarkMode ? 'Mørk modus' : 'Lys modus');

    const selectedLanguage = language || document.documentElement.lang || 'en';
    const translatedLabel = selectedLanguage === 'no'
        ? themeModeText.getAttribute('data-no')
        : themeModeText.getAttribute('data-en');

    themeModeText.textContent = translatedLabel;

    if (labelIcon) {
        labelIcon.className = isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
    }
}

/**
 * Build a theme controller that syncs the UI with the stored preference.
 * @param {{getLanguage: function(): string}} options
 * @returns {{init: function(): boolean, setTheme: function(boolean): void, refreshLabel: function(): void, getTheme: function(): boolean}}
 */
export function createThemeController({ getLanguage }) {
    let { darkMode: isDarkMode } = readPreferences();

    function applyTheme() {
        toggleThemeClasses(isDarkMode);
        updateThemeLabel(isDarkMode, getLanguage());
        document.dispatchEvent(new CustomEvent('themeChange', { detail: { darkMode: isDarkMode } }));
    }

    function setTheme(nextState) {
        isDarkMode = nextState;
        saveThemePreference(isDarkMode);
        applyTheme();
    }

    function init() {
        const toggle = select('#dark-mode-toggle');
        if (toggle) {
            toggle.checked = isDarkMode;
            toggle.addEventListener('change', () => setTheme(toggle.checked));
        }

        applyTheme();
        return isDarkMode;
    }

    function refreshLabel() {
        updateThemeLabel(isDarkMode, getLanguage());
    }

    return { init, setTheme, refreshLabel, getTheme: () => isDarkMode };
}
