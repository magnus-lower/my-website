import { qsa, qs } from './dom.js';

function revealOnScroll() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, index) => {
            if (!entry.isIntersecting) return;

            const delay = index * 0.1;
            entry.target.style.transitionDelay = `${delay}s`;
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.1 });

    qsa('.fade-in').forEach((element) => observer.observe(element));
}

function toggleScrollButton() {
    const scrollButton = qs('#scroll-top');
    if (!scrollButton) return;

    const updateVisibility = () => {
        const shouldShow = window.scrollY > 300;
        scrollButton.classList.toggle('is-visible', shouldShow);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

export function initScrollFeatures() {
    revealOnScroll();
    toggleScrollButton();
}
