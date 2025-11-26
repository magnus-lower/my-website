import { initDarkModeToggle } from './features/appearance/darkModeToggle.js';
import { initScrollReveal } from './features/appearance/scrollReveal.js';
import { initHamburgerMenu } from './features/navigation/hamburgerMenu.js';
import { highlightActiveNavigation } from './features/navigation/activeNavigationHighlight.js';
import { initSettingsDropdown } from './features/navigation/settingsDropdown.js';
import { initLanguageSwitcher } from './features/localization/languageSwitcher.js';
import { initTypingEffects } from './features/content/typingEffect.js';
import { initProjectCardLinks } from './features/content/projectCardLinks.js';
import { initContactFormHandler } from './features/forms/contactFormHandler.js';
import { initResumeLinkManager } from './features/resources/resumeLinkManager.js';

function registerThemeChangeHandler() {
    document.addEventListener('themeChange', () => {
        document.querySelectorAll('.fade-in.visible').forEach(element => {
            element.classList.toggle('dark-mode', document.documentElement.classList.contains('dark-mode'));
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initDarkModeToggle();
    initHamburgerMenu();
    initScrollReveal();
    initLanguageSwitcher();
    initTypingEffects();
    initContactFormHandler();
    highlightActiveNavigation();
    initSettingsDropdown();
    initResumeLinkManager();
    initProjectCardLinks();
    registerThemeChangeHandler();
});
