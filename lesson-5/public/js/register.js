const USER = 'user';
(function () {
    const user = JSON.parse(localStorage.getItem(USER)) || {};
    if (user.id) window.location.href = '/index.html';
}())

const elForm = document.querySelector('.js-form');
const BASE_URL = 'http://localhost:3000/api'
const register = async ({ name, email, password }) => {
    const data = await fetch(`${BASE_URL}/auth/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    return await data.json();
}

elForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(elForm);
    const data = Object.fromEntries(formData.entries());
    const user = await register(data);
    if (!user.ok) return alert(user.message);
    alert(user.message);
    window.location.href = '/login.html';
})