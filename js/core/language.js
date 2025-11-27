import { readPreferences, saveLanguagePreference } from './preferences.js';
import { selectAll } from '../utils/dom.js';

function applyLanguageToDom(language, { skipTyping = true } = {}) {
    selectAll('[data-en]').forEach(element => {
        if (skipTyping && element.id && element.id.startsWith('typing-')) return;

        const nextValue = language === 'no'
            ? element.getAttribute('data-no')
            : element.getAttribute('data-en');

        if (nextValue !== null) {
            element.textContent = nextValue;
        }
    });

    document.documentElement.lang = language;
}

export function createLanguageController() {
    const listeners = new Set();
    let currentLanguage = readPreferences().language;

    function notify(language) {
        listeners.forEach(callback => callback(language));
    }

    function init() {
        applyLanguageToDom(currentLanguage, { skipTyping: true });
        return currentLanguage;
    }

    function setLanguage(language) {
        currentLanguage = language;
        saveLanguagePreference(language);
        applyLanguageToDom(language, { skipTyping: true });
        notify(language);
    }

    function onChange(callback) {
        listeners.add(callback);
        return () => listeners.delete(callback);
    }

    function getLanguage() {
        return currentLanguage;
    }

    return { init, setLanguage, onChange, getLanguage, applyLanguageToDom };
}
