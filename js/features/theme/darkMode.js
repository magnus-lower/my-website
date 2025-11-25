import { $$, toggleClass } from '../../core/dom.js';
import { dispatchAppEvent, listenAppEvent } from '../../core/events.js';
import { isDarkModePreferred, saveDarkModePreference } from '../../core/preferences.js';

function updateThemeLabel(isDarkMode, language) {
    const themeModeText = document.getElementById('theme-mode-text');
    if (!themeModeText) return;

    const labelEn = isDarkMode ? 'Dark Mode' : 'Light Mode';
    const labelNo = isDarkMode ? 'Mørk modus' : 'Lys modus';

    themeModeText.setAttribute('data-en', labelEn);
    themeModeText.setAttribute('data-no', labelNo);

    const text = language === 'no' ? labelNo : labelEn;
    themeModeText.textContent = text;

    const labelIcon = themeModeText.previousElementSibling;
    if (labelIcon) {
        labelIcon.className = isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
    }
}

function applyTheme(enabled) {
    toggleClass(document.documentElement, 'dark-mode', enabled);
    toggleClass(document.body, 'dark-mode', enabled);
    $$('.fade-in.visible, section, .project-item, .hero, .projects-container')
        .forEach((element) => toggleClass(element, 'dark-mode', enabled));

    const scrollButton = document.getElementById('scroll-top');
    toggleClass(scrollButton, 'dark-mode', enabled);
}

function syncToggleState(toggle, enabled) {
    if (toggle) {
        toggle.checked = enabled;
    }
}

function bindLanguageListener() {
    listenAppEvent('languageChange', ({ detail }) => {
        const language = detail.language;
        updateThemeLabel(isDarkModePreferred(), language);
    });
}

export function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;

    const enabled = isDarkModePreferred();
    applyTheme(enabled);
    updateThemeLabel(enabled, document.documentElement.lang);
    syncToggleState(darkModeToggle, enabled);

    darkModeToggle.addEventListener('change', () => {
        const isEnabled = darkModeToggle.checked;
        saveDarkModePreference(isEnabled);
        applyTheme(isEnabled);
        updateThemeLabel(isEnabled, document.documentElement.lang);
        dispatchAppEvent('themeChange', { darkMode: isEnabled });
    });

    bindLanguageListener();
}
