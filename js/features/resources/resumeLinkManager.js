function enableResumeDownloads() {
    const resumeButton = document.getElementById('resume-link');
    if (!resumeButton) return;

    resumeButton.removeAttribute('download');
    resumeButton.setAttribute('target', '_blank');
}

function updateResumePathForLanguage() {
    const resumeLink = document.getElementById('resume-link');
    if (!resumeLink) return;

    const language = localStorage.getItem('language') || 'en';
    const fileName = language === 'no' ? 'norwegian_cv.pdf' : 'english_cv.pdf';
    resumeLink.href = `assets/${fileName}`;
}

export function initResumeLinkManager() {
    enableResumeDownloads();
    updateResumePathForLanguage();
}
