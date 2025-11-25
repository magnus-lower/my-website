import { getStoredValue, setStoredValue } from './storage.js';

export const DEFAULT_LANGUAGE = 'no';
export const STORAGE_KEYS = {
    LANGUAGE: 'language',
    DARK_MODE: 'darkMode'
};

export function getLanguagePreference() {
    return getStoredValue(STORAGE_KEYS.LANGUAGE, DEFAULT_LANGUAGE);
}

export function saveLanguagePreference(language) {
    setStoredValue(STORAGE_KEYS.LANGUAGE, language);
    document.documentElement.lang = language;
    return language;
}

export function isDarkModePreferred() {
    return getStoredValue(STORAGE_KEYS.DARK_MODE) === 'true';
}

export function saveDarkModePreference(enabled) {
    setStoredValue(STORAGE_KEYS.DARK_MODE, String(enabled));
    return enabled;
}
