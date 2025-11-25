export const getElement = (selector, scope = document) => scope.querySelector(selector);

export const getElements = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

export const toggleClass = (element, className, force) => {
    if (!element) return;
    element.classList.toggle(className, force);
};

export const addClass = (element, className) => {
    if (!element) return;
    element.classList.add(className);
};

export const removeClass = (element, className) => {
    if (!element) return;
    element.classList.remove(className);
};

export const setAttributes = (element, attributes = {}) => {
    if (!element) return;
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
};
