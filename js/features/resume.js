import { getElement } from '../core/dom.js';

const getResumeFileName = (language) => (language === 'no' ? 'norwegian_cv.pdf' : 'english_cv.pdf');

export const prepareResumeLink = () => {
    const resumeLink = getElement('#resume-link');
    if (!resumeLink) return;

    resumeLink.removeAttribute('download');
    resumeLink.setAttribute('target', '_blank');
};

export const updateResumeLanguage = (language) => {
    const resumeLink = getElement('#resume-link');
    if (!resumeLink) return;

    const fileName = getResumeFileName(language);
    resumeLink.href = `assets/${fileName}`;

    const resumeText = resumeLink.querySelector('.resume-text');
    if (resumeText) {
        resumeText.textContent = language === 'no' ? 'CV' : 'Resume';
    }
};
