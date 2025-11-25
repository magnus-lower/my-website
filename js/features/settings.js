import { getElement, removeClass } from '../core/dom.js';
import { onClickOutside } from '../core/events.js';
import { selectLanguage } from './language.js';

export const initSettingsPanel = () => {
    const settingsToggle = getElement('.settings-toggle');
    const settingsDropdown = getElement('#settings-dropdown');
    if (!settingsToggle || !settingsDropdown) return;

    settingsToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        settingsDropdown.classList.toggle('visible');
    });

    onClickOutside([settingsToggle, settingsDropdown], () => {
        removeClass(settingsDropdown, 'visible');
    });

    const languageToggle = getElement('#language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', (event) => {
            const { target } = event;
            if (target.classList.contains('flag-icon')) {
                const language = target.id.split('-')[0];
                selectLanguage(language);
            }
        });
    }
};
