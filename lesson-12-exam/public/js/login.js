const elForm = document.querySelector('.js-form');

const login = async (data) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
};

elForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const data = Object.fromEntries(new FormData(evt.target));
    const res = await login(data);
    if (res.status != 200) return alert(res.message);
    const user = res.data.user;
    setLocalStorageItem(TOKEN, user.token);
    setLocalStorageItem(USER, JSON.stringify(user));
    window.location.href = "/";
});