const USER = 'user';
const BASE_URL = 'http://localhost:3000/api';

(function () {
    const user = JSON.parse(localStorage.getItem(USER)) || {};
    if (!user.id) window.location.href = '/login.html';
}());

const elForm = document.querySelector('.js-form');

const publish = async ({ title, content }) => {
    const user = JSON.parse(localStorage.getItem(USER)) || {};
    delete user.message;
    delete user.ok;
    const data = await fetch(`${BASE_URL}/post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content, author: user })
    });
    return await data.json();
}

elForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const formData = new FormData(elForm);
    const data = Object.fromEntries(formData.entries());
    const user = JSON.parse(localStorage.getItem(USER)) || {};
    delete user.message;
    delete user.ok;
    const res = await publish({ ...data, author: user });
    if (!res.ok) return alert(res.message);
    alert(res.message);
    elForm.reset();
});