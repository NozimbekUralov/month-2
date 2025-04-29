const elFormSignin = document.querySelector(".js-form-signin");
const elFormSignup = document.querySelector(".js-form-signup");


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


elFormSignup.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    try {
        const formData = new FormData(evt.target);
        const data = Object.fromEntries(formData.entries());
        const res = await register(data);
        if (res) confirm("user successfully registered. you can login now");
    } catch (err) {
        console.log(err);
    }

});

elFormSignin.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData.entries());
    const res = await login(data);
    console.log(res);
    if (res.id) {
        setLocalStorageItem(USER, res);
        setLocalStorageItem(TOKEN, res.token);
        window.location.href = '/';
    }
})