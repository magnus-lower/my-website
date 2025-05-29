import { initDarkMode }      from './modules/darkmode.js';
import { initHamburger }     from './modules/hamburger.js';
import { initScrollToTop }     from './modules/scrollTop.js';
import {initProjectProgressBar} from './modules/progressBar.js';
import { initSmoothScroll }  from './modules/smoothScroll.js';
import { initLanguageSwitcher, updateLanguage }      from './modules/language.js';
import { initTypingEffects }        from './modules/typing.js';
import { initContactForm } from "./modules/contactForm.js";
import { highlightActiveNavLink } from './modules/navHighlight.js';

// Initialize settings panel functionality
function initSettingsPanel() {
    const settingsToggle = document.querySelector('.settings-toggle');
    const settingsDropdown = document.getElementById('settings-dropdown');

    if (!settingsToggle || !settingsDropdown) return;

    // Toggle settings dropdown
    settingsToggle.addEventListener('click', () => {
        settingsDropdown.classList.toggle('visible');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!settingsToggle.contains(e.target) && !settingsDropdown.contains(e.target)) {
            settingsDropdown.classList.remove('visible');
        }
    });

    // Language toggle functionality
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('flag-icon')) {
                const lang = target.id.split('-')[0]; // Extract 'en' or 'no' from id
                localStorage.setItem('language', lang);
                updateLanguage(lang);
            }
        });
    }
}

// In js/main.js, add this function after the document.addEventListener('DOMContentLoaded', ...) block
function initResumeButton() {
    const resumeBtn = document.getElementById('resume-link');
    if (!resumeBtn) return;

    // Remove the download attribute
    resumeBtn.removeAttribute('download');

    // Add target="_blank" to open in new tab
    resumeBtn.setAttribute('target', '_blank');
}

// Check if resume path needs fixing
function fixResumePath() {
    const resumeLink = document.getElementById('resume-link');
    if (resumeLink) {
        const lang = localStorage.getItem('language') || 'en';
        const fileName = lang === 'no' ? 'norwegian_cv.pdf' : 'english_cv.pdf';
        resumeLink.href = `assets/${fileName}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initHamburger();
    initScrollToTop();
    initProjectProgressBar();
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
    document.querySelectorAll('.project-link').forEach(card => {
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-url');
            if (url) window.open(url, '_blank');
        });
    });
});