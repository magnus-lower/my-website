import { getStoredLanguage } from './preferences.js';

export function initResumeButton() {
    const resumeBtn = document.getElementById('resume-link');
    if (!resumeBtn) return;

    resumeBtn.removeAttribute('download');
    resumeBtn.setAttribute('target', '_blank');
}

export function fixResumePath() {
    const resumeLink = document.getElementById('resume-link');
    if (!resumeLink) return;

    const language = getStoredLanguage();
    const fileName = language === 'no' ? 'norwegian_cv.pdf' : 'english_cv.pdf';
    resumeLink.href = `assets/${fileName}`;
}
