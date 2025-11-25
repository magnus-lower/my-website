import { qs } from './dom.js';
import { getPreference } from './storage.js';

const RESUME_KEY = 'language';

export function initResumeLink() {
    const resume = qs('#resume-link');
    if (!resume) return;

    resume.removeAttribute('download');
    resume.setAttribute('target', '_blank');
    const currentLanguage = getPreference(RESUME_KEY, 'no');
    updateResumeLanguage(currentLanguage);
}

export function updateResumeLanguage(language) {
    const resume = qs('#resume-link');
    const resumeText = qs('.resume-text');
    if (!resume || !resumeText) return;

    const fileName = language === 'no' ? 'norwegian_cv.pdf' : 'english_cv.pdf';
    resume.href = `assets/${fileName}`;
    resumeText.textContent = language === 'no' ? 'CV' : 'Resume';
}
