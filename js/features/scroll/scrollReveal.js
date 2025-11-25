import { $$ } from '../../core/dom.js';

function addRevealAnimation(entry, observer) {
    const allFadeIns = $$('.fade-in');
    const delay = allFadeIns.indexOf(entry.target) * 0.1;
    entry.target.style.transitionDelay = `${delay}s`;
    entry.target.classList.add('visible');

    if (document.documentElement.classList.contains('dark-mode')) {
        entry.target.classList.add('dark-mode');
    }

    setTimeout(() => {
        entry.target.style.transitionDelay = '0s';
    }, 1000);

    observer.unobserve(entry.target);
}

export function initScrollReveal() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                addRevealAnimation(entry, obs);
            }
        });
    }, { threshold: 0.1 });

    $$('.fade-in').forEach((element) => observer.observe(element));
}
