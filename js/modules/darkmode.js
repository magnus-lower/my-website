// In js/modules/darkmode.js
export function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;

    // Find the theme mode text element
    const themeModeText = document.getElementById('theme-mode-text');

    // Function to update the label text based on both dark mode state and language
    const updateDarkModeLabel = (isDark) => {
        if (themeModeText) {
            const lang = localStorage.getItem('language') || 'en';

            // Update the data attributes to reflect the mode you would SWITCH TO (not the current mode)
            themeModeText.setAttribute('data-en', isDark ? 'Dark Mode' : 'Light Mode');
            themeModeText.setAttribute('data-no', isDark ? 'Mørk modus' : 'Lys modus');

            // Apply the correct text based on current language
            themeModeText.textContent = lang === 'no'
                ? themeModeText.getAttribute('data-no')
                : themeModeText.getAttribute('data-en');

            // Update icon - keep the icon logic as is
            const labelIcon = themeModeText.previousElementSibling;
            if (labelIcon) {
                labelIcon.className = isDark ? "fas fa-moon" : "fas fa-sun";
            }
        }
    };

    // Apply initial state
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    updateDarkModeLabel(isDarkMode);

    if (isDarkMode) {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
        document.querySelectorAll('section, .project-item, .hero, .projects-container')
            .forEach(el => el.classList.add('dark-mode'));
        const scrollButton = document.getElementById('scroll-top');
        if (scrollButton) scrollButton.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener('change', () => {
        const enabled = darkModeToggle.checked;
        updateDarkModeLabel(enabled);
        document.documentElement.classList.toggle('dark-mode', enabled);
        document.body.classList.toggle('dark-mode', enabled);
        document.querySelectorAll('section, .project-item, .hero, .projects-container')
            .forEach(el => el.classList.toggle('dark-mode', enabled));
        const scrollButton = document.getElementById('scroll-top');
        if (scrollButton) scrollButton.classList.toggle('dark-mode', enabled);
        localStorage.setItem('darkMode', enabled.toString());
        document.dispatchEvent(new CustomEvent('themeChange', { detail: { darkMode: enabled } }));
    });
}