import { qs, qsa } from './dom.js';
import { getPreference, setPreference } from './storage.js';
import { syncThemeLanguage } from './theme.js';
import { restartTypingEffects } from './typing.js';
import { updateResumeLanguage } from './resume.js';

const LANGUAGE_KEY = 'language';

function setFlagOpacity(language) {
    const enFlag = qs('#en-flag');
    const noFlag = qs('#no-flag');

    if (enFlag) enFlag.style.opacity = language === 'en' ? '1' : '0.5';
    if (noFlag) noFlag.style.opacity = language === 'no' ? '1' : '0.5';
}

function setDataText(language) {
    qsa('[data-en]').forEach((element) => {
        if (element.id && element.id.startsWith('typing-')) return;
        const text = language === 'no' ? element.getAttribute('data-no') : element.getAttribute('data-en');
        if (text !== null) {
            element.textContent = text;
        }
    });

    const typingEffect = qs('#typing-effect');
    if (typingEffect) {
        const fallback = language === 'no' ? typingEffect.getAttribute('data-no') : typingEffect.getAttribute('data-en');
        typingEffect.textContent = fallback;
    }
}

export function applyLanguage(language) {
    document.documentElement.lang = language;
    setPreference(LANGUAGE_KEY, language);
    setDataText(language);
    updateResumeLanguage(language);
    setFlagOpacity(language);
    syncThemeLanguage(language);
    restartTypingEffects();
}

export function initLanguageSwitcher() {
    const selectedLanguage = getPreference(LANGUAGE_KEY, 'no');
    applyLanguage(selectedLanguage);

    const languageToggle = qs('#language-toggle');
    if (!languageToggle) return;

    languageToggle.addEventListener('click', (event) => {
        const flag = event.target.closest('.flag-icon');
        if (!flag) return;

        const language = flag.id.startsWith('no') ? 'no' : 'en';
        applyLanguage(language);
    });
}
