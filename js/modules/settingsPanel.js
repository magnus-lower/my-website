import { on, qs } from './dom.js';

export function initSettingsPanel() {
    const toggle = qs('.settings-toggle');
    const dropdown = qs('#settings-dropdown');

    if (!toggle || !dropdown) return;

    on(toggle, 'click', () => {
        const isVisible = dropdown.classList.toggle('visible');
        toggle.setAttribute('aria-expanded', String(isVisible));
    });

    document.addEventListener('click', (event) => {
        if (!dropdown.classList.contains('visible')) return;
        const target = event.target;
        if (!toggle.contains(target) && !dropdown.contains(target)) {
            dropdown.classList.remove('visible');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}
