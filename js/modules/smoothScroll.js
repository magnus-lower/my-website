export function initSmoothScroll() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                // Add staggered animation delay based on index
                const delay = Array.from(document.querySelectorAll('.fade-in')).indexOf(e.target) * 0.1;
                e.target.style.transitionDelay = `${delay}s`;
                e.target.classList.add('visible');

                // Apply dark mode to newly visible elements if dark mode is active
                if (document.documentElement.classList.contains('dark-mode')) {
                    e.target.classList.add('dark-mode');
                }

                // Remove the delay after animation completes to not affect future animations
                setTimeout(() => {
                    e.target.style.transitionDelay = '0s';
                }, 1000);

                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}