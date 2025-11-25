import { qs } from './dom.js';
import { getPreference, setPreference } from './storage.js';

const THEME_KEY = 'darkMode';
let currentLanguage = getPreference('language', 'no');

function updateThemeLabel(isDarkMode) {
    const label = qs('#theme-mode-text');
    if (!label) return;

    const enText = isDarkMode ? 'Dark Mode' : 'Light Mode';
    const noText = isDarkMode ? 'Mørk modus' : 'Lys modus';

    label.setAttribute('data-en', enText);
    label.setAttribute('data-no', noText);
    label.textContent = currentLanguage === 'no' ? noText : enText;

    const icon = label.previousElementSibling;
    if (icon) {
        icon.className = isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
    }
}

function applyTheme(isDarkMode) {
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
    setPreference(THEME_KEY, String(isDarkMode));
    updateThemeLabel(isDarkMode);
    document.dispatchEvent(new CustomEvent('themeChange', { detail: { darkMode: isDarkMode } }));
}

export function initTheme() {
    const toggle = qs('#dark-mode-toggle');
    if (!toggle) return;

    const storedPreference = getPreference(THEME_KEY, 'false') === 'true';
    toggle.checked = storedPreference;
    applyTheme(storedPreference);

    toggle.addEventListener('change', () => {
        applyTheme(toggle.checked);
    });
}

export function syncThemeLanguage(language) {
    currentLanguage = language;
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    updateThemeLabel(isDarkMode);
}
