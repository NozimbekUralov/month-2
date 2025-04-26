const USER = "user";

function checkAuth() {
    const user = getLocalStorageItem(USER);
    if (!user) window.location.href = "/auth";
};

function getLocalStorageItem(key) {
    return JSON.parse(localStorage.getItem(key));
};

function setLocalStorageItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
};