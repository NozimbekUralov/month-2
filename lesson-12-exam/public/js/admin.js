checkAuth();

const elVideoTemp = document.querySelector(".js-video-temp").content;
const elVideosList = document.querySelector(".js-videos-list");
const elForm = document.querySelector(".js-form");

const updateVideo = async ({ id, title }) => {
    const opts = {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${getLocalStorageItem(TOKEN)}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
    }
    const res = await fetch(`${BASE_URL}/user/videos/${id}`, opts);
    return res.json();
}


const deleteVideo = async (id) => {
    const res = await fetch(`${BASE_URL}/user/videos/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${getLocalStorageItem(TOKEN)}`
        }
    });
    return res.json();
}

const renderVideo = (video) => {
    const clone = elVideoTemp.cloneNode(true);
    clone.querySelector(".js-video").dataset.id = video.id;
    clone.querySelector(".js-video video").src = `${BASE_URL}/${video.link}`;
    clone.querySelector(".js-video p").textContent = video.title;

    return clone;
}

const renderUserVideos = (videos) => {
    const fragment = document.createDocumentFragment();
    elVideosList.innerHTML = "";
    videos.forEach((v) => {
        const clone = renderVideo(v);
        fragment.appendChild(clone);
    });
    elVideosList.appendChild(fragment);
}

const updateTitle = async (el) => {
    const id = el.closest(".js-video").dataset.id;
    const title = el.textContent;
    const res = await updateVideo({ id, title });
    if (res.status != 200) return alert(res.message);
}

const updateVideoTitle = debounce(updateTitle, 3000);

(async () => {
    const user = JSON.parse(getLocalStorageItem(USER));
    const res = await getUserVideos(user.id);
    if (res.status != 200) return alert(res.message);
    renderUserVideos(res.data.videos);
})()

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

elForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const res = await uploadVideo(formData);
    if (res.status != 201) return alert(res.message);
    const clone = renderVideo(res.data.file);
    elVideosList.prepend(clone);
});

elVideosList.addEventListener("click", async (evt) => {
    const target = evt.target;
    const videoId = target.closest(".js-video").dataset.id;
    if (target.classList.contains("delete-icon")) {
        const con = confirm("Are you sure?")
        if (!con) return;
        const res = await deleteVideo(videoId);
        if (res.status != 200) return alert(res.message);
        evt.target.closest(".js-video").remove();
    }
})



