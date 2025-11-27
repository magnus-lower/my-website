import { preloadPreferences } from './bootstrap.js';
import { createLanguageController } from './language.js';
import { createThemeController } from './theme.js';
import { initNavigation } from '../components/navigation.js';
import { initSettingsPanel } from '../components/settingsPanel.js';
import { initResumeLink } from '../components/resumeLink.js';
import { highlightActiveNavLink } from '../features/navigation/navHighlight.js';
import { initFadeInObserver } from '../features/scroll/fadeInObserver.js';
import { initTyping } from '../features/typing/typingController.js';
import { initContactForm } from '../features/contact/contactForm.js';
import { initProjectLinks } from '../features/projects/projectLinks.js';

preloadPreferences();

document.addEventListener('DOMContentLoaded', () => {
    const languageController = createLanguageController();
    const themeController = createThemeController({ getLanguage: languageController.getLanguage });

    const initialLanguage = languageController.init();
    themeController.init();

    const typingController = initTyping(initialLanguage);
    const resumeController = initResumeLink(initialLanguage);

    languageController.onChange(language => {
        themeController.refreshLabel();
        typingController.restart(language);
        resumeController.refresh(language);
    });

    initSettingsPanel({
        onLanguageSelect: language => languageController.setLanguage(language),
    });

    initNavigation();
    highlightActiveNavLink();
    initFadeInObserver();
    initContactForm();
    initProjectLinks();
});
