import { initContactForm } from './modules/contactForm.js';
import { initLanguageSwitcher } from './modules/language.js';
import { initNavigation } from './modules/navigation.js';
import { initProjectLinks } from './modules/projectLinks.js';
import { initScrollFeatures } from './modules/scroll.js';
import { initSettingsPanel } from './modules/settingsPanel.js';
import { initTheme } from './modules/theme.js';
import { initResumeLink } from './modules/resume.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSettingsPanel();
    initTheme();
    initLanguageSwitcher();
    initResumeLink();
    initContactForm();
    initProjectLinks();
    initScrollFeatures();
});
