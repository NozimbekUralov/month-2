const USER = 'user';
(function () {
    const user = JSON.parse(localStorage.getItem(USER)) || {};
    if (user.id) window.location.href = '/index.html';
}())


const elForm = document.querySelector('.js-form');
const BASE_URL = 'http://localhost:3000/api'

const login = async ({ email, password }) => {
    const data = await fetch(`${BASE_URL}/auth/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    return await data.json();
}

elForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData(elForm);
        const data = Object.fromEntries(formData.entries());
        const user = await login(data);
        if (!user.id) throw new Error(user.message);
        localStorage.setItem(USER, JSON.stringify(user))
        window.location.href = '/index.html';
    }
    catch (error) {
        return alert(error.message);
    }
})
