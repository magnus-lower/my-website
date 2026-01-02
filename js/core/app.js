import { preloadPreferences } from "./preferences-preloader.js";
import { createLanguageController } from "./language.js";
import { createThemeController } from "./theme.js";
import { initNavigation } from "../components/navigation.js";
import { initSettingsPanel } from "../components/settings-panel.js";
import { initResumeLink } from "../components/resume-link.js";
import { highlightActiveNavLink } from "../features/navigation/nav-highlight.js";
import { initFadeInObserver } from "../features/scroll/fade-in-observer.js";
import { initTyping } from "../features/typing/typing-controller.js";
import { initContactForm } from "../features/contact/contact-form.js";
import { initProjectLinks } from "../features/projects/project-links.js";
import { initProjectMedia } from "../features/projects/project-media.js";

/**
 * Boot the client application by preloading preferences and wiring all feature modules.
 */
export function startApp() {
  preloadPreferences();

  document.addEventListener("DOMContentLoaded", () => {
    const languageController = createLanguageController();
    const themeController = createThemeController({
      getLanguage: languageController.getLanguage,
    });

    const initialLanguage = languageController.init();
    themeController.init();

    const typingController = initTyping(initialLanguage);
    const resumeController = initResumeLink(initialLanguage);

    languageController.onChange((language) => {
      themeController.refreshLabel();
      typingController.restart(language);
      resumeController.refresh(language);
    });

    initSettingsPanel({
      onLanguageSelect: (language) => languageController.setLanguage(language),
    });

    initNavigation();
    highlightActiveNavLink();
    initFadeInObserver();
    initContactForm();
    initProjectLinks();
    initProjectMedia();
  });
}

startApp();
