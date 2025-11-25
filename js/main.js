import { initializeApp } from './core/app.js';
import { initDarkMode } from './features/theme/darkMode.js';
import { initLanguageFeature } from './features/language/languageController.js';
import { initScrollReveal } from './features/scroll/scrollReveal.js';
import { initContactForm } from './features/forms/contactForm.js';
import { initNavHighlight } from './features/navigation/navHighlight.js';
import { initProjectLinks } from './features/navigation/projectLinks.js';
import { initResumeLink } from './features/resume/resumeLink.js';
import { initHamburgerMenu } from './ui/hamburgerMenu.js';
import { initSettingsPanel } from './ui/settingsPanel.js';

initializeApp([
    initDarkMode,
    initHamburgerMenu,
    initScrollReveal,
    initLanguageFeature,
    initContactForm,
    initNavHighlight,
    initSettingsPanel,
    initResumeLink,
    initProjectLinks
]);
