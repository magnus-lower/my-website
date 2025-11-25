import { qs } from './dom.js';
import { getPreference } from './storage.js';

let typingIntervals = [];
const TYPING_IDS = ['typing-effect', 'typing-projects', 'typing-about'];

function clearTypingForElement(element) {
    typingIntervals = typingIntervals.filter((item) => {
        if (item.el === element) {
            clearInterval(item.interval);
            return false;
        }
        return true;
    });
}

function typeEffect(element, text, speed = 100) {
    if (!element || !text) return;

    clearTypingForElement(element);
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

    typingIntervals.push({ el: element, interval });
}

function clearAllTyping() {
    typingIntervals.forEach(({ interval }) => clearInterval(interval));
    typingIntervals = [];
}

export function initTypingEffects() {
    const language = getPreference('language', 'no');

    setTimeout(() => {
        TYPING_IDS.forEach((id) => {
            const element = qs(`#${id}`);
            if (!element) return;

            const text = language === 'no' ? element.getAttribute('data-no') : element.getAttribute('data-en');
            typeEffect(element, text);
        });
    }, 1);
}

export function restartTypingEffects() {
    clearAllTyping();
    TYPING_IDS.forEach((id) => {
        const element = qs(`#${id}`);
        if (element) element.textContent = '';
    });
    setTimeout(initTypingEffects, 200);
}
