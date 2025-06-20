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

    // Update theme mode text explicitly (to handle the dynamic dark/light mode label)
    const themeModeText = document.getElementById('theme-mode-text');
    if (themeModeText) {
        themeModeText.textContent = lang === 'no'
            ? themeModeText.getAttribute('data-no')
            : themeModeText.getAttribute('data-en');
    }

    const resumeText = document.querySelector('.resume-text');
    if (resumeText) {
        resumeText.textContent = lang === 'no' ? 'CV' : 'Resume';
    }

    const resumeLink = document.getElementById('resume-link');
    if (resumeLink) {
        resumeLink.href = lang === 'no'
            ? 'assets/norwegian_cv.pdf'
            : 'assets/english_cv.pdf';
    }

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
    let lang = localStorage.getItem('language') || 'no';
    updateLanguage(lang, true);

    // No need to add event listeners here as they're handled in initSettingsPanel
}
