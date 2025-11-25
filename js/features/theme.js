import { addClass, getElement, getElements, toggleClass } from '../core/dom.js';
import { getDarkMode, getLanguage, setDarkMode } from '../core/state.js';

const DARK_MODE_CLASS_TARGETS = 'section, .project-item, .hero, .projects-container';

const applyThemeClasses = (enabled) => {
    toggleClass(document.documentElement, 'dark-mode', enabled);
    toggleClass(document.body, 'dark-mode', enabled);
    getElements(DARK_MODE_CLASS_TARGETS).forEach((element) => toggleClass(element, 'dark-mode', enabled));

    const scrollButton = getElement('#scroll-top');
    toggleClass(scrollButton, 'dark-mode', enabled);
};

const updateDarkModeLabel = (enabled, language = getLanguage()) => {
    const themeModeText = getElement('#theme-mode-text');
    if (!themeModeText) return;

    themeModeText.setAttribute('data-en', enabled ? 'Dark Mode' : 'Light Mode');
    themeModeText.setAttribute('data-no', enabled ? 'Mørk modus' : 'Lys modus');
    themeModeText.textContent = language === 'no'
        ? themeModeText.getAttribute('data-no')
        : themeModeText.getAttribute('data-en');

    const labelIcon = themeModeText.previousElementSibling;
    if (labelIcon) {
        labelIcon.className = enabled ? 'fas fa-moon' : 'fas fa-sun';
    }
};

export const syncThemeWithPreferences = () => {
    const isDarkMode = getDarkMode();
    updateDarkModeLabel(isDarkMode, getLanguage());
    applyThemeClasses(isDarkMode);

    const darkModeToggle = getElement('#dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.checked = isDarkMode;
    }
};

export const initThemeControls = () => {
    const darkModeToggle = getElement('#dark-mode-toggle');
    if (!darkModeToggle) return;

    syncThemeWithPreferences();

    darkModeToggle.addEventListener('change', () => {
        const enabled = darkModeToggle.checked;
        updateDarkModeLabel(enabled, getLanguage());
        applyThemeClasses(enabled);
        setDarkMode(enabled);
    });

    document.addEventListener('themeChange', (event) => {
        const { darkMode } = event.detail;
        updateDarkModeLabel(darkMode, getLanguage());
        applyThemeClasses(darkMode);
        if (darkModeToggle.checked !== darkMode) {
            darkModeToggle.checked = darkMode;
        }
    });

    document.addEventListener('languageChange', (event) => {
        const { language } = event.detail;
        updateDarkModeLabel(getDarkMode(), language);
    });
};

export const markVisibleElementsForTheme = () => {
    const visibleElements = getElements('.fade-in.visible');
    const isDarkMode = getDarkMode();

    visibleElements.forEach((element) => {
        toggleClass(element, 'dark-mode', isDarkMode);
    });
};

export const ensureScrollButtonIsDecorated = () => {
    const scrollButton = getElement('#scroll-top');
    if (scrollButton && getDarkMode()) {
        addClass(scrollButton, 'dark-mode');
    }
};
