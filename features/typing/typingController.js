import { select } from '../../utils/dom.js';

let typingIntervals = [];

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

function startTyping(language) {
    const typingTargets = [
        'typing-effect',
        'typing-projects',
        'typing-about',
    ];

    typingTargets.forEach(id => {
        const element = select(`#${id}`);
        if (!element) return;

        const text = language === 'no'
            ? element.getAttribute('data-no')
            : element.getAttribute('data-en');

        typeEffect(element, text);
    });
}

export function initTyping(language) {
    startTyping(language);

    return {
        restart: nextLanguage => {
            clearAllTyping();
            typingIntervals = [];

            typingTargetsReset();
            startTyping(nextLanguage);
        },
    };
}

function typingTargetsReset() {
    ['typing-effect', 'typing-projects', 'typing-about'].forEach(id => {
        const element = select(`#${id}`);
        if (element) {
            element.textContent = '';
        }
    });
}
