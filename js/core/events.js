export function dispatchAppEvent(name, detail = {}) {
    document.dispatchEvent(new CustomEvent(name, { detail }));
}

export function listenAppEvent(name, handler) {
    document.addEventListener(name, handler);
}

export function onClickOutside(element, triggers, callback) {
    document.addEventListener('click', (event) => {
        const isTrigger = triggers.some(trigger => trigger && trigger.contains(event.target));
        const isInside = element && element.contains(event.target);

        if (!isTrigger && !isInside) {
            callback(event);
        }
    });
}
