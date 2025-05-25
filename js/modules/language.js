// js/modules/language.js
import { initTypingEffects, restartTypingEffects } from './typing.js';

export function updateLanguage(lang, firstLoad = false) {
    document.querySelectorAll('[data-en]').forEach(el => {
        // skip the typing placeholders
        if (el.id && el.id.startsWith('typing-')) return;

        el.textContent = lang === 'no'
            ? el.getAttribute('data-no')
            : el.getAttribute('data-en');
    });

    document.documentElement.lang = lang;

    // Update flag opacities
    const enFlag = document.getElementById('en-flag');
    const noFlag = document.getElementById('no-flag');

    if (enFlag && noFlag) {
        enFlag.style.opacity = lang === 'en' ? '1' : '0.5';
        noFlag.style.opacity = lang === 'no' ? '1' : '0.5';
    }

    if (firstLoad) initTypingEffects();
    else restartTypingEffects();
}

export function initLanguageSwitcher() {
    // Read saved language, apply on load
    let lang = localStorage.getItem('language') || 'en';
    updateLanguage(lang, true);

    // No need to add event listeners here as they're handled in initSettingsPanel
}