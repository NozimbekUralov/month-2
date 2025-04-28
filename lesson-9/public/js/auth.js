const elFormSignin = document.querySelector(".js-form-signin");
const elFormSignup = document.querySelector(".js-form-signup");

const BASE_URL = "http://localhost:3000";

const register = async (data) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await res.json();
}

const login = async (data) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await res.json();
}
