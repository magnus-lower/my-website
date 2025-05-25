export function initScrollToTop() {
    const scrollButton = document.getElementById('scroll-top');
    if (!scrollButton) return;

    // Set initial state
    scrollButton.style.opacity = '0';
    scrollButton.style.visibility = 'hidden';
    scrollButton.style.display = 'none';

    // Handler function to show/hide button based on scroll position
    const handleScroll = () => {
        // Important: Check the current dark mode state from HTML class
        const isDarkMode = document.documentElement.classList.contains('dark-mode');

        // Make sure dark mode is consistently applied to all elements that need it
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
            document.body.classList.add('dark-mode');
            scrollButton.classList.add('dark-mode');
        } else {
            // We only remove from the scroll button, not the document/body
            // to avoid accidentally removing dark mode
            scrollButton.classList.remove('dark-mode');
        }

        // Regular scroll position logic
        if (window.scrollY > 300) {
            scrollButton.style.display = 'flex';
            setTimeout(() => {
                scrollButton.style.visibility = 'visible';
                scrollButton.style.opacity = '0.8';
            }, 10);
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
            setTimeout(() => {
                if (window.scrollY <= 300) {
                    scrollButton.style.display = 'none';
                }
            }, 300);
        }
    };

    // Add click handler
    scrollButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Check initial scroll position
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Also listen for theme changes to update button state
    document.addEventListener('themeChange', handleScroll);
}