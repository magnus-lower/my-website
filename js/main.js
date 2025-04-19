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
});