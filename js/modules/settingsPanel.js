export function initSettingsPanel() {
    const settingsToggle = document.querySelector('.settings-toggle');
    const settingsDropdown = document.getElementById('settings-dropdown');

    if (!settingsToggle || !settingsDropdown) return;

    // Toggle settings dropdown
    settingsToggle.addEventListener('click', () => {
        settingsDropdown.classList.toggle('visible');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!settingsToggle.contains(e.target) && !settingsDropdown.contains(e.target)) {
            settingsDropdown.classList.remove('visible');
        }
    });

    // Language toggle functionality
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('flag-icon')) {
                const lang = target.id.split('-')[0]; // Extract 'en' or 'no' from id
                localStorage.setItem('language', lang);
                // We import updateLanguage lazily to avoid circular deps
                import('./language.js').then(mod => mod.updateLanguage(lang));
            }
        });
    }
}
