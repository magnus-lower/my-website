import { $$, setText } from '../../core/dom.js';
import { dispatchAppEvent } from '../../core/events.js';
import { getLanguagePreference, saveLanguagePreference } from '../../core/preferences.js';
import { restartTypingEffects, startTypingEffects } from './typingEffects.js';

const TYPING_IDS = ['typing-effect', 'typing-projects', 'typing-about'];

function shouldSkipElement(element) {
    return element.id && TYPING_IDS.includes(element.id);
}

function getTranslation(element, language) {
    return language === 'no'
        ? element.getAttribute('data-no')
        : element.getAttribute('data-en');
}

export function applyLanguage(language, { restartTyping = false } = {}) {
    const langToApply = saveLanguagePreference(language);

    $$("[data-en]").forEach((element) => {
        if (shouldSkipElement(element)) return;
        const translatedText = getTranslation(element, langToApply);
        setText(element, translatedText);
    });

    if (restartTyping) {
        restartTypingEffects();
    } else {
        startTypingEffects();
    }

    dispatchAppEvent('languageChange', { language: langToApply });
}

export function initLanguageFeature() {
    const language = getLanguagePreference();
    applyLanguage(language, { restartTyping: false });
}

export function setLanguage(language) {
    applyLanguage(language, { restartTyping: true });
}
