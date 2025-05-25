// In js/modules/darkmode.js
export function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;

    // Find the label element
    const darkModeLabel = document.querySelector('.settings-item-label:has(i.fas.fa-moon)');
    if (darkModeLabel) {
        const labelText = darkModeLabel.lastChild;
        const labelIcon = darkModeLabel.querySelector('i');

        // Function to update the label text and icon based on dark mode state
        const updateDarkModeLabel = (isDark) => {
            if (labelText) {
                // Display "Dark Mode" when in dark mode, and "Light Mode" when in light mode
                labelText.textContent = isDark ? " Dark Mode" : " Light Mode";
            }
            if (labelIcon) {
                // Keep the icon the same - sun in dark mode, moon in light mode
                labelIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
            }
        };

        // Apply initial label
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        updateDarkModeLabel(isDarkMode);

        // Update the label when the toggle changes
        darkModeToggle.addEventListener('change', () => {
            updateDarkModeLabel(darkModeToggle.checked);
        });
    }

    // Rest of your existing dark mode code
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

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