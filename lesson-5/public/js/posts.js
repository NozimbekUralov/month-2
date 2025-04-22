const USER = 'user';
const BASE_URL = 'http://localhost:3000/api';
let ID = null;
(function () {
    const user = JSON.parse(localStorage.getItem(USER)) || {};
    if (!user.id) window.location.href = '/login.html';
}());

const elPostsList = document.querySelector('.js-posts-list');
const elModalForm = document.querySelector('.js-modal-form');

const getPosts = async () => {
    const user = JSON.parse(localStorage.getItem(USER)) || {};
    delete user.message;
    delete user.ok;
    const data = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: user.id })
    });
    return await data.json();
};

const deletePost = async (id) => {
    const data = await fetch(`${BASE_URL}/post`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    });
    return await data.json();
};

const editPost = async ({ id, content, title }) => {
    const data = await fetch(`${BASE_URL}/post`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, content, title })
    });
    return await data.json();
}

const render = (posts) => {
    elPostsList.innerHTML = '';
    posts.forEach((post) => {
        const elPost = document.createElement('li');
        elPost.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <button class="js-delete-post" data-id="${post.id}">Delete</button>
            <a href="#demo-modal" class="js-edit-post" data-id="${post.id}">Edit</a>
        `;
        elPostsList.appendChild(elPost);
    });
}

elModalForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData);
    const res = ID && await editPost({ ...data, id: ID });
    if (!res.ok) return;
    alert(res.message);
    const loc = window.location.href.split('#')[0];
    window.location.href = loc;
    ID = null;
});

elPostsList.addEventListener('click', async (evt) => {
    if (evt.target.classList.contains('js-delete-post')) {
        const id = evt.target.dataset.id;
        const res = await deletePost(id);
        console.log(res);
        if (!res.ok) return alert(res.message);
        window.location.reload();
    };
    if (evt.target.classList.contains('js-edit-post')) ID = evt.target.dataset.id;
});

(async () => {
    const res = await getPosts();
    if (!res.ok) return;
    render(res.posts);
})();
