import { getStoredLanguage } from './preferences.js';

let typingIntervals = [];

function typeEffect(el, text, speed=100) {
    if (!el || !text) return;

    // Clear any existing interval for this element
    clearTypingForElement(el);

    el.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
        if (i <= text.length) {
            el.textContent = text.substring(0, i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, speed);

    typingIntervals.push({ el, interval });
}

function clearTypingForElement(el) {
    typingIntervals = typingIntervals.filter(item => {
        if (item.el === el) {
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
    // Small delay to ensure DOM is ready
    setTimeout(() => {
        const lang = getStoredLanguage();

        // Try each element individually to avoid one failure stopping others
        const typingEffect = document.getElementById('typing-effect');
        if (typingEffect) {
            const text = lang === 'no' ? typingEffect.getAttribute('data-no') : typingEffect.getAttribute('data-en');
            typeEffect(typingEffect, text);
        }

        const typingProjects = document.getElementById('typing-projects');
        if (typingProjects) {
            const text = lang === 'no' ? typingProjects.getAttribute('data-no') : typingProjects.getAttribute('data-en');
            typeEffect(typingProjects, text);
        }

        const typingAbout = document.getElementById('typing-about');
        if (typingAbout) {
            const text = lang === 'no' ? typingAbout.getAttribute('data-no') : typingAbout.getAttribute('data-en');
            typeEffect(typingAbout, text);
        }
    }, 1);
}

export function restartTypingEffects() {
    clearAllTyping();

    ['typing-effect', 'typing-projects', 'typing-about'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '';
    });

    setTimeout(initTypingEffects, 200);
}