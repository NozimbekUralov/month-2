checkAuth()

const elForm = document.querySelector(".js-form");
const elLogoutBtn = document.querySelector(".js-logout");
const elDeleteBtn = document.querySelector(".js-delete");

const elPostsTable = document.querySelector(".js-posts-table");
const elRowTemplate = document.querySelector(".js-row-template").content;

const allPosts = async () => {
    const token = getLocalStorageItem(TOKEN);
    const res = await fetch(BASE_URL + "/posts", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return await res.json();
}

const updateProfile = async (data) => {
    const token = getLocalStorageItem(TOKEN);
    const res = await fetch(BASE_URL + "/user/", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`

        },
        body: JSON.stringify(data)
    })
    return await res.json();
}

const deleteProfile = async () => {
    const res = await fetch(BASE_URL + "/user", {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${getLocalStorageItem(TOKEN)}`
        }
    });
    return await res.json();
}

const deletePost = async (id) => {
    const res = await fetch(BASE_URL + `/post/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${getLocalStorageItem(TOKEN)}`
        }
    });
    return await res.json();
}

const render = async (data) => {
    const name = data.name;
    const email = data.email;
    const { posts } = await allPosts();
    elPostsTable.innerHTML = "";
    posts.forEach((post) => {
        const clone = elRowTemplate.cloneNode(true);
        clone.querySelector(".js-title").textContent = post.title;
        clone.querySelector(".js-edit-link").href = `#${post.id}`;
        clone.querySelector(".js-delete-form").dataset.id = post.id;
        elPostsTable.appendChild(clone);
    })

    document.querySelector(".js-posts").textContent = `${posts.length}`;
    elForm.querySelector(".js-name").placeholder = name;
    elForm.querySelector(".js-email").placeholder = email;
}

render(getLocalStorageItem(USER));

elForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData.entries());
    const res = await updateProfile(data);
    console.log(res);
    if (res.id) {
        setLocalStorageItem(USER, res);
        render(res);
    }
});

elLogoutBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/auth";
})

elDeleteBtn.addEventListener("click", async () => {
    const res = await deleteProfile();
    if (res) {
        localStorage.clear();
        window.location.href = "/auth";
    }
});

elPostsTable.addEventListener("click", async (evt) => {
    const target = evt.target;
    if (target.classList.contains("btn-danger")) {
        const id = target.parentElement.dataset.id;
        const res = await deletePost(id);
    }
});