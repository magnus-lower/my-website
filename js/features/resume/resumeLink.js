import { $, setText } from '../../core/dom.js';
import { listenAppEvent } from '../../core/events.js';
import { getLanguagePreference } from '../../core/preferences.js';

const RESUME_TEXT = {
    en: 'Resume',
    no: 'CV'
};

const RESUME_FILES = {
    en: 'assets/english_cv.pdf',
    no: 'assets/norwegian_cv.pdf'
};

function updateResumeLink(language) {
    const resumeLink = $('#resume-link');
    const resumeText = $('.resume-text');

    if (!resumeLink || !resumeText) return;

    const langKey = language === 'no' ? 'no' : 'en';
    resumeLink.href = RESUME_FILES[langKey];
    setText(resumeText, RESUME_TEXT[langKey]);
}

export function initResumeLink() {
    const resumeLink = $('#resume-link');
    if (!resumeLink) return;

    resumeLink.removeAttribute('download');
    resumeLink.setAttribute('target', '_blank');

    const language = getLanguagePreference();
    updateResumeLink(language);

    listenAppEvent('languageChange', ({ detail }) => updateResumeLink(detail.language));
}
