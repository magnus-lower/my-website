export const readString = (key, fallback = null) => {
    const stored = localStorage.getItem(key);
    return stored === null ? fallback : stored;
};

export const saveString = (key, value) => {
    localStorage.setItem(key, value);
};

export const readBoolean = (key, fallback = false) => {
    const stored = localStorage.getItem(key);
    if (stored === null) return fallback;
    return stored === 'true';
};

export const saveBoolean = (key, value) => {
    localStorage.setItem(key, value.toString());
};
