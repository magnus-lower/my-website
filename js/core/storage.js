const isLocalStorageAvailable = () => {
    try {
        const testKey = '__storage_test__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
};

const storageAvailable = isLocalStorageAvailable();

export function getStoredValue(key, fallback = null) {
    if (!storageAvailable) return fallback;
    const value = localStorage.getItem(key);
    return value !== null ? value : fallback;
}

export function setStoredValue(key, value) {
    if (!storageAvailable) return;
    localStorage.setItem(key, value);
}
