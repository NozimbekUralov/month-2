const USER = 'user';
(function () {
    const user = JSON.parse(localStorage.getItem(USER)) || {};
    if (!user.id) window.location.href = '/login.html';
}());

const elLogoutBtn = document.querySelector('.js-logout');
const elInfo = document.querySelector('.js-info');
const elForm = document.querySelector('.js-form');
const BASE_URL = 'http://localhost:3000/api'

const render = () => {
    elInfo.innerHTML = '';
    const user = JSON.parse(localStorage.getItem(USER)) || {};
    const li = document.createElement('li');
    li.innerHTML = `name: ${user.name} email: ${user.email}`
    elInfo.append(li);
};
render();

const update = async ({ name, email }) => {
    const user = JSON.parse(localStorage.getItem(USER)) || {};
    const data = await fetch(`${BASE_URL}/user/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
    const res = await data.json();
    if (res.ok) localStorage.setItem(USER, JSON.stringify({ ...user, name, email }));
    return res;
};

elForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(elForm);
    const data = Object.fromEntries(formData.entries());
    const res = await update(data);
    if (!res.ok) return alert(res.message);
    render();
});

elLogoutBtn.addEventListener('click', (evt) => {
    localStorage.removeItem(USER);
    window.location.href = '/login.html';
});
