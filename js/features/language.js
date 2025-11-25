import { getElements, getElement } from '../core/dom.js';
import { getLanguage, setLanguage } from '../core/state.js';
import { restartTypingEffects, startTypingEffects } from './typing.js';
import { updateResumeLanguage } from './resume.js';

const updateDataDrivenText = (language) => {
    getElements('[data-en]').forEach((element) => {
        if (element.id && element.id.startsWith('typing-')) return;

        const translation = language === 'no'
            ? element.getAttribute('data-no')
            : element.getAttribute('data-en');

        if (translation !== null) {
            element.textContent = translation;
        }
    });
};

const updateTypingElements = (language) => {
    const typingEffect = getElement('span#typing-effect') || getElement('#typing-effect');
    const typingProjects = getElement('#typing-projects');
    const typingAbout = getElement('#typing-about');

    [typingEffect, typingProjects, typingAbout].forEach((element) => {
        if (!element) return;

        const translation = language === 'no'
            ? element.getAttribute('data-no')
            : element.getAttribute('data-en');

        if (translation !== null) {
            element.textContent = translation;
        }
    });
};

const updateLanguageMetadata = (language) => {
    document.documentElement.lang = language;

    const enFlag = getElement('#en-flag');
    const noFlag = getElement('#no-flag');

    if (enFlag && noFlag) {
        enFlag.style.opacity = language === 'en' ? '1' : '0.5';
        noFlag.style.opacity = language === 'no' ? '1' : '0.5';
    }
};

const syncThemeModeText = (language) => {
    const themeModeText = getElement('#theme-mode-text');
    if (!themeModeText) return;

    const translation = language === 'no'
        ? themeModeText.getAttribute('data-no')
        : themeModeText.getAttribute('data-en');

    if (translation !== null) {
        themeModeText.textContent = translation;
    }
};

export const applyLanguage = (language, { isInitialLoad = false } = {}) => {
    updateDataDrivenText(language);
    updateTypingElements(language);
    updateLanguageMetadata(language);
    updateResumeLanguage(language);
    syncThemeModeText(language);

    if (isInitialLoad) {
        startTypingEffects();
    } else {
        restartTypingEffects();
    }
};

export const initLanguage = () => {
    const language = getLanguage();
    applyLanguage(language, { isInitialLoad: true });

    document.addEventListener('languageChange', (event) => {
        applyLanguage(event.detail.language);
    });
};

export const selectLanguage = (language) => {
    setLanguage(language);
};
