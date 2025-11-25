import { getLanguagePreference } from '../../core/preferences.js';

const typingIntervals = new Map();

function typeEffect(element, text, speed = 100) {
    if (!element || !text) return;

    clearTypingFor(element);
    element.textContent = '';

    let index = 0;
    const interval = setInterval(() => {
        if (index <= text.length) {
            element.textContent = text.substring(0, index);
            index += 1;
        } else {
            clearInterval(interval);
        }
    }, speed);

    typingIntervals.set(element, interval);
}

function clearTypingFor(element) {
    const interval = typingIntervals.get(element);
    if (interval) {
        clearInterval(interval);
        typingIntervals.delete(element);
    }
}

function clearAllTyping() {
    typingIntervals.forEach(interval => clearInterval(interval));
    typingIntervals.clear();
}

function resolveText(element, language) {
    const textNo = element.getAttribute('data-no');
    const textEn = element.getAttribute('data-en');
    return language === 'no' ? textNo : textEn;
}

export function startTypingEffects() {
    const language = getLanguagePreference();
    const typingElements = [
        document.getElementById('typing-effect'),
        document.getElementById('typing-projects'),
        document.getElementById('typing-about')
    ].filter(Boolean);

    typingElements.forEach((element) => {
        const text = resolveText(element, language);
        typeEffect(element, text);
    });
}

export function restartTypingEffects() {
    clearAllTyping();

    ['typing-effect', 'typing-projects', 'typing-about']
        .map(id => document.getElementById(id))
        .filter(Boolean)
        .forEach(element => {
            element.textContent = '';
        });

    setTimeout(startTypingEffects, 200);
}
