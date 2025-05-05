const BASE_URL = 'http://localhost:3000/api';
const TOKEN = "token";
const USER = "user";

const setLocalStorageItem = (key, value) => {
    localStorage.setItem(key, value);
};

const getLocalStorageItem = (key) => {
    const value = localStorage.getItem(key);
    return value;
};

const checkAuth = async () => {
    const res = await fetch(`${BASE_URL}/user/me`, {
        headers: {
            "Authorization": `Bearer ${getLocalStorageItem(TOKEN)}`
        }
    });
    const data = await res.json();
    if (data.status != 200) window.location.href = "/login";
}

const getUserVideos = async (id) => {
    const res = await fetch(`${BASE_URL}/user/videos/${id}`, {
        headers: {
            "Authorization": `Bearer ${getLocalStorageItem(TOKEN)}`,
        }
    });
    return await res.json();
}

const uploadVideo = async (data) => {
    const res = await fetch(`${BASE_URL}/user/upload`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${getLocalStorageItem(TOKEN)}`
        },
        body: data
    });
    return res.json();
}