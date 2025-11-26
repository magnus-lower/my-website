export function initSmoothScroll() {
    const fadeElements = Array.from(document.querySelectorAll('.fade-in'));
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const delay = fadeElements.indexOf(entry.target) * 0.1;
            entry.target.style.transitionDelay = `${delay}s`;
            entry.target.classList.add('visible');

            if (document.documentElement.classList.contains('dark-mode')) {
                entry.target.classList.add('dark-mode');
            }

            setTimeout(() => {
                entry.target.style.transitionDelay = '0s';
            }, 1000);

            obs.unobserve(entry.target);
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => observer.observe(element));
}