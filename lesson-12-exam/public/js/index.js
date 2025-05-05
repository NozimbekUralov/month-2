checkAuth();

const elUsersTemp = document.querySelector(".js-user-temp").content;
const elUsersList = document.querySelector(".js-users-list");
const elVideoTemp = document.querySelector(".js-video-temp").content;
const elVideosList = document.querySelector(".js-videos-list");
const elLogoutBtn = document.querySelector(".js-logout");
const elAvatarImg = document.querySelector(".js-avatar");
const elForm = document.querySelector(".js-form");
const elMic = document.querySelector(".js-mic");
const elVideoBtn = document.querySelector(".js-video-btn");
const elVideoFeed = document.querySelector(".js-video-feed");
const elCloseBtn = document.getElementById("js-close-btn");
const elRecordBtn = document.getElementById("js-record-btn");
const elFormModal = document.querySelector(".js-record-form");



let VIDEOS = null;


const getAllUsers = async () => {
    const res = await fetch(`${BASE_URL}/user/all`, {
        headers: {
            "Authorization": `Bearer ${getLocalStorageItem(TOKEN)}`,
        }
    });
    return await res.json();
}

const renderUsers = (users) => {
    const fragment = document.createDocumentFragment();
    users.forEach((user) => {
        const clone = elUsersTemp.cloneNode(true);
        clone.querySelector(".channel").dataset.id = user.id;
        clone.querySelector(".channel a span").textContent = user.name;
        clone.querySelector(".channel a img").src = BASE_URL + "/" + user.avatar;
        fragment.appendChild(clone);
    });
    elUsersList.appendChild(fragment);
}

const renderVideo = (video) => {
    const clone = elVideoTemp.cloneNode(true);
    const link = BASE_URL + "/" + video.link;
    const user = JSON.parse(getLocalStorageItem(USER));
    clone.querySelector(".js-video video").src = link;
    clone.querySelector(".js-video a").href = link;
    clone.querySelector(".js-title").textContent = video.title;
    clone.querySelector(".js-video h2").textContent = user.name;
    return clone;
}

const renderVideos = (videos) => {
    elVideosList.innerHTML = "";
    if (!videos) return;
    const fragment = document.createDocumentFragment();
    videos.forEach((video) => {
        const clone = renderVideo(video);
        fragment.append(clone);
    });
    elVideosList.append(fragment);
}

const renderAvatar = () => {
    const user = JSON.parse(getLocalStorageItem(USER));
    elAvatarImg.src = BASE_URL + "/" + user.avatar;
}

(async () => {
    try {
        renderAvatar();
        const { data: { users } } = await getAllUsers();
        renderUsers(users);
        const user = JSON.parse(getLocalStorageItem(USER));
        const { data: { videos } } = await getUserVideos(user.id);
        VIDEOS = videos;
        renderVideos(VIDEOS);
    } catch (err) {
        console.error(err);
    }
})()

elLogoutBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/login";
});

elUsersList.addEventListener("click", async (evt) => {
    const id = evt.target.closest(".channel").dataset.id;
    if (!id) return;
    if (id === "main") {
        const user = JSON.parse(getLocalStorageItem(USER));
        const { data: { videos } } = await getUserVideos(user.id);
        VIDEOS = videos;
    } else {
        const { data: { videos } } = await getUserVideos(id);
        VIDEOS = videos;
    }
    renderVideos(VIDEOS);
});

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const form = Object.fromEntries(formData.entries())
    if (!form.search) return;
    const data = VIDEOS.filter((v) => v.title.includes(form.search));
    renderVideos(data);
    evt.target.reset();
})

elMic.addEventListener("click", (evt) => {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onstart = () => {
            console.log('Speech recognition started');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log(`You said: ${transcript}`);
            elForm.querySelector(".js-search").value = `${transcript}`;
        };

        recognition.onend = () => { };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

    } else {
        console.log('Speech recognition is not supported in this browser.');
    }

});

class videoRecorder {
    stream = null;
    recorder = null;
    recordedVideo = [];

    async start() {
        if (this.stream == null) this.stream = await this.getVideoFeed();

        this.recorder = new MediaRecorder(this.stream, {
            mimeType: "video/mp4"
        });

        this.recorder.ondataavailable = (evt) => {
            if (!(evt.data.size > 0)) return;
            this.recordedVideo.push(evt.data);
        }

        this.recorder.start();
    }

    stop() {
        if (this.recorder != null) this.recorder.stop();
        this.stream.getTracks().forEach((track) => track.stop());
    }

    async getVideoFeed() {
        this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        return this.stream;
    }
}

const recorder = new videoRecorder();

elFormModal.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const blob = new Blob(recorder.recordedVideo, { type: "video/mp4" });
    formData.append("file", blob, "video.mp4");
    const { data: { file } } = await uploadVideo(formData);
    VIDEOS.push(file);
    evt.target.reset();
    const clone = renderVideo(file);
    elVideosList.prepend(clone);
});

elVideoBtn.addEventListener("click", async (evt) => {
    elVideoFeed.srcObject = await recorder.getVideoFeed()
});

elRecordBtn.addEventListener("click", (evt) => {
    const stop = "stop recording";
    const start = "start recording";

    if (elRecordBtn.textContent == start) {
        elRecordBtn.textContent = stop;
        recorder.start();
        return;
    }

    if (elRecordBtn.textContent == stop) {
        elRecordBtn.textContent = start;
        recorder.stop();
        elFormModal.hidden = false;
        elRecordBtn.disabled = true;
        return;
    }
});

elCloseBtn.addEventListener("click", (evt) => {
    recorder.stop();
    elVideoFeed.srcObject = null;
    elRecordBtn.textContent = "start recording";
    elFormModal.reset();
});
