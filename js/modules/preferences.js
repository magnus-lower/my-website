const LANGUAGE_KEY = 'language';
const DARK_MODE_KEY = 'darkMode';
const DEFAULT_LANGUAGE = 'no';

export function getStoredLanguage() {
    return localStorage.getItem(LANGUAGE_KEY) || DEFAULT_LANGUAGE;
}

export function setStoredLanguage(language) {
    localStorage.setItem(LANGUAGE_KEY, language);
}

export function getStoredDarkModePreference() {
    return localStorage.getItem(DARK_MODE_KEY) === 'true';
}

export function setStoredDarkModePreference(enabled) {
    localStorage.setItem(DARK_MODE_KEY, enabled.toString());
}
