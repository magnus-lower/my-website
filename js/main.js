import { initDarkMode }      from './modules/darkmode.js';
import { initHamburger }     from './modules/hamburger.js';
import { initProjectProgressBar, initGlobalProjectLinks } from './modules/progressBar.js';
import { initSmoothScroll }  from './modules/smoothScroll.js';
import { initLanguageSwitcher }      from './modules/language.js';
import { initTypingEffects }        from './modules/typing.js';
import { initContactForm } from "./modules/contactForm.js";
import { highlightActiveNavLink } from './modules/navHighlight.js';
import { initSettingsPanel } from './modules/settingsPanel.js';
import { initResumeButton, fixResumePath } from './modules/resume.js';
import { initProjectLinks } from './modules/projectLinks.js';

document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initHamburger();
    initProjectProgressBar();
    initGlobalProjectLinks();
    initSmoothScroll();
    initLanguageSwitcher();
    initTypingEffects();
    initContactForm();
    highlightActiveNavLink();
    initSettingsPanel();
    initResumeButton();
    fixResumePath();

    // Listen for theme changes to update content appearance
    document.addEventListener('themeChange', () => {
        // Update fade-in elements when theme changes
        document.querySelectorAll('.fade-in.visible').forEach(el => {
            if (document.documentElement.classList.contains('dark-mode')) {
                el.classList.add('dark-mode');
            } else {
                el.classList.remove('dark-mode');
            }
        });
    });

    // Initialize project links for card clicks
    initProjectLinks();
});
