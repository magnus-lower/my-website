export const qs = (selector, scope = document) => scope.querySelector(selector);
export const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

export const on = (element, event, handler) => {
    if (!element) return;
    element.addEventListener(event, handler);
};

export function toggleAriaExpanded(element, isExpanded) {
    if (element) {
        element.setAttribute('aria-expanded', String(isExpanded));
    }
}
