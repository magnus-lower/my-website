import { setStoredLanguage } from './preferences.js';
import { updateLanguage } from './language.js';

const DROPDOWN_VISIBLE_CLASS = 'visible';

export function initSettingsPanel() {
    const settingsToggle = document.querySelector('.settings-toggle');
    const settingsDropdown = document.getElementById('settings-dropdown');
    const languageToggle = document.getElementById('language-toggle');

    if (!settingsToggle || !settingsDropdown) return;

    settingsToggle.addEventListener('click', () => {
        settingsDropdown.classList.toggle(DROPDOWN_VISIBLE_CLASS);
    });

    document.addEventListener('click', (event) => {
        if (!settingsToggle.contains(event.target) && !settingsDropdown.contains(event.target)) {
            settingsDropdown.classList.remove(DROPDOWN_VISIBLE_CLASS);
        }
    });

    if (!languageToggle) return;

    languageToggle.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.classList.contains('flag-icon')) return;

        const language = target.id.split('-')[0];
        setStoredLanguage(language);
        updateLanguage(language);
    });
}
