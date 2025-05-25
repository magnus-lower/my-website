export function initSmoothScroll() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');

                // Apply dark mode to newly visible elements if dark mode is active
                if (document.documentElement.classList.contains('dark-mode')) {
                    e.target.classList.add('dark-mode');
                }

                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}