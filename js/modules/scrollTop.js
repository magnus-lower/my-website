export function initScrollToTop() {
    const scrollButton = document.getElementById('scroll-top');
    if (!scrollButton) return;

    // Force immediate hiding with inline styles (highest priority)
    scrollButton.style.cssText = 'opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; display: none !important;';

    // Delay the scroll event setup to ensure DOM is fully processed
    window.addEventListener('DOMContentLoaded', () => {
        // Handler function to show/hide button based on scroll position
        const handleScroll = () => {
            requestAnimationFrame(() => {
                if (window.scrollY > 300) {
                    scrollButton.style.cssText = 'opacity: 0.8; visibility: visible; pointer-events: auto; display: flex;';
                } else {
                    scrollButton.style.cssText = 'opacity: 0; visibility: hidden; pointer-events: none; display: none;';
                }
            });
        };

        // First set proper initial state
        requestAnimationFrame(handleScroll);

        // Then add the scroll listener
        window.addEventListener('scroll', handleScroll);
    });

    // Add click handler
    scrollButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}