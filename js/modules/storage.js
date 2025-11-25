const supportsLocalStorage = (() => {
    try {
        const testKey = '__storage_test__';
        window.localStorage.setItem(testKey, testKey);
        window.localStorage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
})();

export function getPreference(key, fallback = null) {
    if (!supportsLocalStorage) return fallback;
    const value = window.localStorage.getItem(key);
    return value !== null ? value : fallback;
}

export function setPreference(key, value) {
    if (!supportsLocalStorage) return;
    window.localStorage.setItem(key, value);
}
