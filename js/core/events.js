export const onDocumentReady = (callback) => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
};

export const onClickOutside = (elements, handler) => {
    const targets = Array.isArray(elements) ? elements : [elements];
    document.addEventListener('click', (event) => {
        const clickedInside = targets.some((element) => element && element.contains(event.target));
        if (!clickedInside) handler(event);
    });
};
