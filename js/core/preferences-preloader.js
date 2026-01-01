import { readPreferences } from "./preferences.js";

/**
 * Preload persisted user preferences to minimise visual flashes before the app bootstraps.
 * @returns {{language: string, darkMode: boolean}} The previously stored preferences.
 */
export function preloadPreferences() {
  const { language, darkMode } = readPreferences();

  document.documentElement.lang = language;

  if (darkMode) {
    document.documentElement.classList.add("dark-mode");
  }

  return { language, darkMode };
}
