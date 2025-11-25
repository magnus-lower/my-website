import { readBoolean, readString, saveBoolean, saveString } from './storage.js';

const LANGUAGE_KEY = 'language';
const DARK_MODE_KEY = 'darkMode';
const DEFAULT_LANGUAGE = 'no';

export const initializePreferences = () => {
    const language = getLanguage();
    saveString(LANGUAGE_KEY, language);
    document.documentElement.lang = language;

    const darkMode = getDarkMode();

    return { language, darkMode };
};

export const getLanguage = () => readString(LANGUAGE_KEY, DEFAULT_LANGUAGE);

export const setLanguage = (language) => {
    saveString(LANGUAGE_KEY, language);
    document.documentElement.lang = language;
    document.dispatchEvent(new CustomEvent('languageChange', { detail: { language } }));
};

export const getDarkMode = () => readBoolean(DARK_MODE_KEY, false);

export const setDarkMode = (enabled) => {
    saveBoolean(DARK_MODE_KEY, enabled);
    document.dispatchEvent(new CustomEvent('themeChange', { detail: { darkMode: enabled } }));
};
