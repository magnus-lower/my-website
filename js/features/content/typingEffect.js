let typingIntervals = [];

function typeEffect(element, text, speed = 100) {
    if (!element || !text) return;

    clearTypingForElement(element);
    element.textContent = '';
    let index = 0;

    const interval = setInterval(() => {
        if (index <= text.length) {
            element.textContent = text.substring(0, index);
            index++;
        } else {
            clearInterval(interval);
        }
    }, speed);

    typingIntervals.push({ element, interval });
}

function clearTypingForElement(element) {
    typingIntervals = typingIntervals.filter(item => {
        if (item.element === element) {
            clearInterval(item.interval);
            return false;
        }
        return true;
    });
}

function clearAllTyping() {
    typingIntervals.forEach(item => clearInterval(item.interval));
    typingIntervals = [];
}

export function initTypingEffects() {
    setTimeout(() => {
        const language = localStorage.getItem('language') || 'en';

        const typingEffect = document.getElementById('typing-effect');
        if (typingEffect) {
            const text = language === 'no' ? typingEffect.getAttribute('data-no') : typingEffect.getAttribute('data-en');
            typeEffect(typingEffect, text);
        }

        const typingProjects = document.getElementById('typing-projects');
        if (typingProjects) {
            const text = language === 'no' ? typingProjects.getAttribute('data-no') : typingProjects.getAttribute('data-en');
            typeEffect(typingProjects, text);
        }

        const typingAbout = document.getElementById('typing-about');
        if (typingAbout) {
            const text = language === 'no' ? typingAbout.getAttribute('data-no') : typingAbout.getAttribute('data-en');
            typeEffect(typingAbout, text);
        }
    }, 1);
}

export function restartTypingEffects() {
    clearAllTyping();

    ['typing-effect', 'typing-projects', 'typing-about'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = '';
    });

    setTimeout(initTypingEffects, 200);
}
