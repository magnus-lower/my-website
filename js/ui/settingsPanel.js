import { $, on } from '../core/dom.js';
import { onClickOutside } from '../core/events.js';
import { setLanguage } from '../features/language/languageController.js';

export function initSettingsPanel() {
    const settingsToggle = $('.settings-toggle');
    const settingsDropdown = $('#settings-dropdown');
    const languageToggle = $('#language-toggle');

    if (!settingsToggle || !settingsDropdown) return;

    on('click', settingsToggle, () => {
        settingsDropdown.classList.toggle('visible');
    });

    onClickOutside(settingsDropdown, [settingsToggle], () => {
        settingsDropdown.classList.remove('visible');
    });

    if (languageToggle) {
        on('click', languageToggle, (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) return;
            if (!target.classList.contains('flag-icon')) return;

            const language = target.id.split('-')[0];
            setLanguage(language);
        });
    }
}
