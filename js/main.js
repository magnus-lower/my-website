import { onDocumentReady } from './core/events.js';
import { initializePreferences } from './core/state.js';
import { initContactForm } from './features/contact.js';
import { initLanguage } from './features/language.js';
import { initHamburgerMenu, highlightActiveNavLink } from './features/navigation.js';
import { initProjectLinks } from './features/projects.js';
import { prepareResumeLink } from './features/resume.js';
import { initRevealOnScroll, updateVisibleElementsForTheme } from './features/scrollEffects.js';
import { initSettingsPanel } from './features/settings.js';
import { ensureScrollButtonIsDecorated, initThemeControls } from './features/theme.js';

onDocumentReady(() => {
    initializePreferences();

    initLanguage();
    initThemeControls();
    updateVisibleElementsForTheme();
    initSettingsPanel();

    initHamburgerMenu();
    highlightActiveNavLink();

    initRevealOnScroll();
    initProjectLinks();
    initContactForm();
    prepareResumeLink();
    ensureScrollButtonIsDecorated();

    document.addEventListener('themeChange', updateVisibleElementsForTheme);
});
