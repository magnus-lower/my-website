import { initDarkMode }      from './modules/darkmode.js';
import { initHamburger }     from './modules/hamburger.js';
import { initScrollToTop }     from './modules/scrollTop.js';
import {initProjectProgressBar} from './modules/progressBar.js';
import { initSmoothScroll }  from './modules/smoothScroll.js';
import { initLanguageSwitcher }      from './modules/language.js';
import { initTypingEffects }        from './modules/typing.js';
import { initContactForm } from "./modules/contactForm.js";
import { highlightActiveNavLink } from './modules/navHighlight.js';

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
});

export function initSettingsPanel() {
    const settingsToggle = document.querySelector('.settings-toggle');
    const settingsDropdown = document.getElementById('settings-dropdown');

    if (!settingsToggle || !settingsDropdown) return;

    // Toggle settings dropdown
    settingsToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsDropdown.classList.toggle('visible');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!settingsDropdown.contains(e.target) && !settingsToggle.contains(e.target)) {
            settingsDropdown.classList.remove('visible');
        }
    });

    // Language toggle functionality
    const langToggle = document.getElementById('language-toggle');
    const enFlag = document.getElementById('en-flag');
    const noFlag = document.getElementById('no-flag');

    if (langToggle && enFlag && noFlag) {
        // Set initial state based on localStorage
        const currentLang = localStorage.getItem('language') || 'en';
        if (currentLang === 'en') {
            enFlag.style.opacity = '1';
            noFlag.style.opacity = '0.5';
        } else {
            enFlag.style.opacity = '0.5';
            noFlag.style.opacity = '1';
        }

        // Toggle language on click
        langToggle.addEventListener('click', () => {
            const newLang = localStorage.getItem('language') === 'en' ? 'no' : 'en';
            localStorage.setItem('language', newLang);

            if (newLang === 'en') {
                enFlag.style.opacity = '1';
                noFlag.style.opacity = '0.5';
            } else {
                enFlag.style.opacity = '0.5';
                noFlag.style.opacity = '1';
            }

            // Update language on page - You can reuse your existing language update function here
            updateLanguage(newLang);
        });
    }
}