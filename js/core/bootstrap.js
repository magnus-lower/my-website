import { readPreferences } from './preferences.js';

export function preloadPreferences() {
    const { language, darkMode } = readPreferences();

    document.documentElement.lang = language;

    if (darkMode) {
        document.documentElement.classList.add('dark-mode');
    }

    return { language, darkMode };
}
