export function initScrollReveal() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const index = Array.from(document.querySelectorAll('.fade-in')).indexOf(entry.target);
            const delay = Math.max(index, 0) * 0.1;
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

    document.querySelectorAll('.fade-in').forEach(element => observer.observe(element));
}
