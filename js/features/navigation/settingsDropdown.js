export function initSettingsDropdown() {
    const settingsToggle = document.querySelector('.settings-toggle');
    const settingsDropdown = document.getElementById('settings-dropdown');

    if (!settingsToggle || !settingsDropdown) return;

    settingsToggle.addEventListener('click', () => {
        settingsDropdown.classList.toggle('visible');
    });

    document.addEventListener('click', (event) => {
        if (!settingsToggle.contains(event.target) && !settingsDropdown.contains(event.target)) {
            settingsDropdown.classList.remove('visible');
        }
    });

    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('flag-icon')) {
                const language = target.id.split('-')[0];
                localStorage.setItem('language', language);
                import('../localization/languageSwitcher.js').then(module => module.updateLanguage(language));
            }
        });
    }
}
