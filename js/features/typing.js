let typingIntervals = [];

const clearTypingForElement = (element) => {
    typingIntervals = typingIntervals.filter((item) => {
        if (item.element === element) {
            clearInterval(item.interval);
            return false;
        }
        return true;
    });
};

const clearAllTyping = () => {
    typingIntervals.forEach((item) => clearInterval(item.interval));
    typingIntervals = [];
};

const typeEffect = (element, text, speed = 100) => {
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

    typingIntervals.push({ element, interval });
};

const startTypingForElement = (element) => {
    if (!element) return;

    const language = localStorage.getItem('language') || 'en';
    const text = language === 'no'
        ? element.getAttribute('data-no')
        : element.getAttribute('data-en');

    typeEffect(element, text);
};

export const startTypingEffects = () => {
    setTimeout(() => {
        ['typing-effect', 'typing-projects', 'typing-about']
            .map((id) => document.getElementById(id))
            .forEach(startTypingForElement);
    }, 1);
};

export const restartTypingEffects = () => {
    clearAllTyping();

    ['typing-effect', 'typing-projects', 'typing-about']
        .map((id) => document.getElementById(id))
        .forEach((element) => {
            if (element) element.textContent = '';
        });

    setTimeout(startTypingEffects, 200);
};
