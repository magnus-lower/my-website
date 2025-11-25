import { addClass, getElements, toggleClass } from '../core/dom.js';
import { getDarkMode } from '../core/state.js';

export const initRevealOnScroll = () => {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const element = entry.target;
            const delay = getElements('.fade-in').indexOf(element) * 0.1;
            element.style.transitionDelay = `${delay}s`;
            addClass(element, 'visible');

            if (getDarkMode()) {
                addClass(element, 'dark-mode');
            }

            setTimeout(() => {
                element.style.transitionDelay = '0s';
            }, 1000);

            obs.unobserve(element);
        });
    }, { threshold: 0.1 });

    getElements('.fade-in').forEach((element) => observer.observe(element));
};

export const updateVisibleElementsForTheme = () => {
    const darkMode = getDarkMode();
    getElements('.fade-in.visible').forEach((element) => toggleClass(element, 'dark-mode', darkMode));
};
