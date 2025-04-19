// js/modules/language.js
import { initTypingEffects, restartTypingEffects } from './typing.js';

function updateLanguage(lang, firstLoad) {
    document.querySelectorAll('[data-en]').forEach(el => {
        // skip the typing placeholders
        if (el.id.startsWith('typing-')) return;
        el.textContent = lang === 'no'
            ? el.getAttribute('data-no')
            : el.getAttribute('data-en');
    });
    document.documentElement.lang = lang;
    const toggle = document.getElementById('language-toggle');
    toggle.src   = lang === 'no' ? 'assets/norwegian-flag.png' : 'assets/uk-flag.png';
    toggle.title = lang === 'no' ? 'Bytt til engelsk' : 'Switch to Norwegian';

    if (firstLoad) initTypingEffects();
    else          restartTypingEffects();
}

export function initLanguageSwitcher() {
    const toggle = document.getElementById('language-toggle');
    if (!toggle) return;

    // 1) Read saved language, apply on load
    let lang = localStorage.getItem('language') || 'en';
    updateLanguage(lang, true);

    // 2) Wire up the click to swap and re‑apply
    toggle.addEventListener('click', () => {
        lang = (lang === 'en' ? 'no' : 'en');
        localStorage.setItem('language', lang);
        updateLanguage(lang, false);
    });
}