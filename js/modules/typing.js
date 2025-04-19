// js/modules/typing.js
let typingInterval;

function typeEffect(el, text, speed=100) {
    clearInterval(typingInterval);
    el.textContent = '';
    let i = 0;
    typingInterval = setInterval(() => {
        el.textContent += text[i++] || '';
        if (i > text.length) clearInterval(typingInterval);
    }, speed);
}

export function initTypingEffects() {
    const lang = localStorage.getItem('language') || 'en';
    ['typing-effect','typing-projects','typing-about']
        .forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const text = lang === 'no'
                ? el.getAttribute('data-no')
                : el.getAttribute('data-en');
            typeEffect(el, text);
        });
}

export function restartTypingEffects() {
    ['typing-effect','typing-projects','typing-about']
        .forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '';
        });
    setTimeout(initTypingEffects, 200);
}