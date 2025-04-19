export function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;

    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Apply dark mode if enabled (apply to both `body` and `html`)
    if (isDarkMode) {
        document.documentElement.classList.add('dark-mode'); // Apply to <html>
        document.body.classList.add('dark-mode'); // Apply to <body>
        darkModeToggle.checked = true;
    }

    // Toggle dark mode and update localStorage
    darkModeToggle.addEventListener('change', () => {
        const enabled = darkModeToggle.checked;

        document.documentElement.classList.toggle('dark-mode', enabled);
        document.body.classList.toggle('dark-mode', enabled);

        localStorage.setItem('darkMode', enabled.toString());
    });

    // Ensure dark mode is persistent on scroll and across all pages
    window.addEventListener('scroll', () => {
        if (localStorage.getItem('darkMode') === 'true') {
            document.documentElement.classList.add('dark-mode');
            document.body.classList.add('dark-mode');
        }
    });
}