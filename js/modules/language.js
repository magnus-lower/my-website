// js/modules/language.js
import { getStoredLanguage, setStoredLanguage } from './preferences.js';
import { initTypingEffects, restartTypingEffects } from './typing.js';

const TYPING_IDS = ['typing-effect', 'typing-projects', 'typing-about'];

const translateContent = (lang) => {
    document.querySelectorAll('[data-en]').forEach(el => {
        if (el.id && el.id.startsWith('typing-')) return;

        const translation = lang === 'no' ? el.getAttribute('data-no') : el.getAttribute('data-en');
        if (translation !== null) {
            el.textContent = translation;
        }
    });
};

const translateTypingElements = (lang) => {
    TYPING_IDS.forEach(id => {
        const element = document.getElementById(id);
        if (!element) return;

        const translation = lang === 'no' ? element.getAttribute('data-no') : element.getAttribute('data-en');
        if (translation !== null) {
            element.textContent = translation;
        }
    });
};

const updateResumeLabel = (lang) => {
    const resumeText = document.querySelector('.resume-text');
    if (resumeText) {
        resumeText.textContent = lang === 'no' ? 'CV' : 'Resume';
    }

    const resumeLink = document.getElementById('resume-link');
    if (resumeLink) {
        resumeLink.href = lang === 'no' ? 'assets/norwegian_cv.pdf' : 'assets/english_cv.pdf';
    }
};

const updateFlags = (lang) => {
    const enFlag = document.getElementById('en-flag');
    const noFlag = document.getElementById('no-flag');
    if (!enFlag || !noFlag) return;

    enFlag.style.opacity = lang === 'en' ? '1' : '0.5';
    noFlag.style.opacity = lang === 'no' ? '1' : '0.5';
};

export function updateLanguage(lang, firstLoad = false) {
    translateContent(lang);
    translateTypingElements(lang);
    updateResumeLabel(lang);
    updateFlags(lang);
    document.documentElement.lang = lang;

    if (firstLoad) {
        initTypingEffects();
    } else {
        restartTypingEffects();
    }
}

export function initLanguageSwitcher() {
    const language = getStoredLanguage();
    setStoredLanguage(language);
    updateLanguage(language, true);
}