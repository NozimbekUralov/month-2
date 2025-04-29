checkAuth();

const elForm = document.querySelector(".js-form");

const createPost = async (data) => {
    const res = await fetch(BASE_URL + "/post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getLocalStorageItem(TOKEN)}`
        },
        body: JSON.stringify(data)
    })
    return await res.json();
}

elForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData.entries());
    const res = await createPost(data);
    if (res) {
        confirm("post successfully created");
        evt.target.reset();
    }
});