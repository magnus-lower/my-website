import { initDarkMode }      from './core/darkmode.js';
import { initHamburger }     from './components/hamburger.js';
import { initSmoothScroll }  from './components/smoothScroll.js';
import { initLanguageSwitcher }      from './core/language.js';
import { initTypingEffects }        from './features/typing.js';
import { initContactForm } from "./features/contactForm.js";
import { highlightActiveNavLink } from './components/navHighlight.js';
import { initSettingsPanel } from './components/settingsPanel.js';
import { initResumeButton, fixResumePath } from './utils/resume.js';
import { initProjectLinks } from './features/projectLinks.js';

document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initHamburger();
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
