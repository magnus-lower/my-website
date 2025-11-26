import { initTypingEffects, restartTypingEffects } from '../content/typingEffect.js';

export function updateLanguage(language, firstLoad = false) {
    document.querySelectorAll('[data-en]').forEach(element => {
        if (element.id && element.id.startsWith('typing-')) return;

        element.textContent = language === 'no'
            ? element.getAttribute('data-no')
            : element.getAttribute('data-en');
    });

    const typingEffect = document.getElementById('typing-effect');
    if (typingEffect) {
        typingEffect.textContent = language === 'no'
            ? typingEffect.getAttribute('data-no')
            : typingEffect.getAttribute('data-en');
    }

    const themeModeText = document.getElementById('theme-mode-text');
    if (themeModeText) {
        themeModeText.textContent = language === 'no'
            ? themeModeText.getAttribute('data-no')
            : themeModeText.getAttribute('data-en');
    }

    const resumeText = document.querySelector('.resume-text');
    if (resumeText) {
        resumeText.textContent = language === 'no' ? 'CV' : 'Resume';
    }

    const resumeLink = document.getElementById('resume-link');
    if (resumeLink) {
        resumeLink.href = language === 'no'
            ? 'assets/norwegian_cv.pdf'
            : 'assets/english_cv.pdf';
    }

    document.documentElement.lang = language;

    const enFlag = document.getElementById('en-flag');
    const noFlag = document.getElementById('no-flag');

    if (enFlag && noFlag) {
        enFlag.style.opacity = language === 'en' ? '1' : '0.5';
        noFlag.style.opacity = language === 'no' ? '1' : '0.5';
    }

    if (firstLoad) {
        initTypingEffects();
    } else {
        restartTypingEffects();
    }
}

export function initLanguageSwitcher() {
    let language = localStorage.getItem('language');
    if (!language) {
        language = 'no';
        localStorage.setItem('language', language);
    }
    updateLanguage(language, true);
}
