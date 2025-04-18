const elForm = document.querySelector(".js-form");
const elModalForm = document.querySelector('.js-modal-form');
const elList = document.querySelector('.js-list');
const elDelBtn = document.querySelector('.js-delete-btn');
const elTemp = document.querySelector('.js-temp').content;


const BASE_URL = 'http://localhost:3000';
let USER_ID = null;

const renderUsers = (users) => {
    elList.innerHTML = '';

    const fragment = document.createDocumentFragment();

    users.forEach(user => {
        const clone = elTemp.cloneNode(true);
        const name = clone.querySelector('.js-name');
        name.textContent = user.name;
        name.dataset.id = user.id;
        clone.querySelector('.js-link').href = `#demo-modal`;
        fragment.append(clone)
    });

    elList.append(fragment);
}

const fetchUsers = async () => {
    const res = await fetch(`${BASE_URL}/users`);
    const { data } = await res.json();

    renderUsers(data);
}
fetchUsers();

elForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const name = evt.target.name.value.trim();
    if (!name) return alert("input field can't be empty");

    const res = await fetch(`${BASE_URL}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    })

    if (res.ok) {
        fetchUsers();
        evt.target.reset();
    } else return alert('Something went wrong');
})

elList.addEventListener('click', (evt) => {
    USER_ID = evt.target.dataset.id;
})

elModalForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const name = evt.target.name.value.trim();
    if (!name) return alert("input field can't be empty");

    const res = await fetch(`${BASE_URL}/users/${USER_ID}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    })
    if (res.ok) {
        fetchUsers();
        evt.target.reset();
        window.location.hash = '#';
        USER_ID = null;
    }
    else return alert('Something went wrong')
})

elDelBtn.addEventListener('click', async () => {
    const res = await fetch(`${BASE_URL}/users/${USER_ID}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        fetchUsers();
        window.location.hash = '#';
        USER_ID = null;
    }
    else return alert('Something went wrong');
})
