/**
 * Query a single DOM element.
 * @param {string} selector
 * @param {ParentNode} [scope=document]
 * @returns {Element|null}
 */
export function select(selector, scope = document) {
    return scope.querySelector(selector);
}

/**
 * Query multiple DOM elements and return them as an array.
 * @param {string} selector
 * @param {ParentNode} [scope=document]
 * @returns {Element[]}
 */
export function selectAll(selector, scope = document) {
    return Array.from(scope.querySelectorAll(selector));
}

/**
 * Attach an event listener and return a disposer.
 * @param {Element|null} element
 * @param {string} event
 * @param {Function} handler
 * @param {AddEventListenerOptions} [options]
 * @returns {function(): void}
 */
export function on(element, event, handler, options) {
    if (!element) return () => {};
    element.addEventListener(event, handler, options);
    return () => element.removeEventListener(event, handler, options);
}
