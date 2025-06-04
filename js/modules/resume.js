export function initResumeButton() {
    const resumeBtn = document.getElementById('resume-link');
    if (!resumeBtn) return;

    resumeBtn.removeAttribute('download');
    resumeBtn.setAttribute('target', '_blank');
}

export function fixResumePath() {
    const resumeLink = document.getElementById('resume-link');
    if (resumeLink) {
        const lang = localStorage.getItem('language') || 'en';
        const fileName = lang === 'no' ? 'norwegian_cv.pdf' : 'english_cv.pdf';
        resumeLink.href = `assets/${fileName}`;
    }
}
