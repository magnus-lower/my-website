export const $ = (selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

export function toggleClass(element, className, force) {
    if (!element) return;
    if (typeof force === 'boolean') {
        element.classList.toggle(className, force);
    } else {
        element.classList.toggle(className);
    }
}

export function setText(element, text) {
    if (!element) return;
    element.textContent = text;
}

export function applyToElements(elements, callback) {
    elements.forEach(callback);
}

export function on(event, element, handler) {
    if (!element) return;
    element.addEventListener(event, handler);
}
