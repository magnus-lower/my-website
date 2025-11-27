export function select(selector, scope = document) {
    return scope.querySelector(selector);
}

export function selectAll(selector, scope = document) {
    return Array.from(scope.querySelectorAll(selector));
}

export function on(element, event, handler, options) {
    if (!element) return () => {};
    element.addEventListener(event, handler, options);
    return () => element.removeEventListener(event, handler, options);
}
