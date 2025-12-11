import { select } from '../utils/dom.js';

function setActiveFlag(language) {
    const enFlag = select('#en-flag');
    const noFlag = select('#no-flag');

    if (enFlag) {
        enFlag.style.opacity = language === 'en' ? '1' : '0.5';
        enFlag.setAttribute('aria-pressed', language === 'en');
    }
    if (noFlag) {
        noFlag.style.opacity = language === 'no' ? '1' : '0.5';
        noFlag.setAttribute('aria-pressed', language === 'no');
    }
}

/**
 * Wire settings dropdown interactions and language toggle visuals.
 * @param {{onLanguageSelect: function(string): void}} options
 */
export function initSettingsPanel({ onLanguageSelect }) {
    const settingsToggle = select('.settings-toggle');
    const settingsDropdown = select('#settings-dropdown');
    const languageToggle = select('#language-toggle');

    if (!settingsToggle || !settingsDropdown) return;

    settingsToggle.addEventListener('click', event => {
        event.stopPropagation();
        const nextExpanded = settingsDropdown.classList.toggle('visible');
        settingsToggle.setAttribute('aria-expanded', String(nextExpanded));
    });

    document.addEventListener('click', event => {
        if (!settingsDropdown.contains(event.target) && !settingsToggle.contains(event.target)) {
            settingsDropdown.classList.remove('visible');
            settingsToggle.setAttribute('aria-expanded', 'false');
        }
    });

    if (languageToggle) {
        languageToggle.addEventListener('click', event => {
            const target = event.target.closest('.flag-icon');
            if (!target) return;

            const language = target.dataset.lang || target.id.split('-')[0];
            setActiveFlag(language);
            onLanguageSelect?.(language);
        });

        languageToggle.addEventListener('keydown', event => {
            if (event.key !== 'Enter' && event.key !== ' ') return;

            const target = event.target.closest('.flag-icon');
            if (!target) return;

            event.preventDefault();
            const language = target.dataset.lang || target.id.split('-')[0];
            setActiveFlag(language);
            onLanguageSelect?.(language);
        });
    }

    setActiveFlag(document.documentElement.lang || 'en');
    settingsToggle.setAttribute('aria-expanded', 'false');
}
