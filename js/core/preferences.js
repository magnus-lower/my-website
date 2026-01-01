const LANGUAGE_KEY = "language";
const THEME_KEY = "darkMode";

/**
 * Retrieve persisted language and theme preferences.
 * @returns {{language: string, darkMode: boolean}}
 */
export function readPreferences() {
  const language = localStorage.getItem(LANGUAGE_KEY) || "no";
  const darkMode = localStorage.getItem(THEME_KEY) === "true";

  if (!localStorage.getItem(LANGUAGE_KEY)) {
    localStorage.setItem(LANGUAGE_KEY, language);
  }

  return { language, darkMode };
}

/**
 * Persist the currently selected language.
 * @param {string} language
 */
export function saveLanguagePreference(language) {
  localStorage.setItem(LANGUAGE_KEY, language);
}

/**
 * Persist the theme selection.
 * @param {boolean} isDarkMode
 */
export function saveThemePreference(isDarkMode) {
  localStorage.setItem(THEME_KEY, isDarkMode.toString());
}
