const elForm = document.querySelector(".js-form");
const BASE_URL = 'http://localhost:3000/api';

const register = async (data) => {
    const res = await fetch(BASE_URL + "/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await res.json();
}

elForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const formData = new FormData(elForm);
    const data = Object.fromEntries(formData);
    const res = await register(data);
    if (!res.user) return;
    confirm("User registered");
    window.location.href = "/auth/login";
})
