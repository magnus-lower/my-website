const LANGUAGE_KEY = 'language';
const THEME_KEY = 'darkMode';

export function readPreferences() {
    const language = localStorage.getItem(LANGUAGE_KEY) || 'no';
    const darkMode = localStorage.getItem(THEME_KEY) === 'true';

    if (!localStorage.getItem(LANGUAGE_KEY)) {
        localStorage.setItem(LANGUAGE_KEY, language);
    }

    return { language, darkMode };
}

export function saveLanguagePreference(language) {
    localStorage.setItem(LANGUAGE_KEY, language);
}

export function saveThemePreference(isDarkMode) {
    localStorage.setItem(THEME_KEY, isDarkMode.toString());
}
