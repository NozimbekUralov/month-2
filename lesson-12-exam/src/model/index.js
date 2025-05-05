const { idProvider, serverConfig: { USERS, VIDEOS } } = require("../utils");

class UserModel {
    constructor({ name, password, avatar } = { name: "", password: "", avatar: "" }) {
        this.id = idProvider(USERS);
        this.name = name;
        this.password = password;
        this.avatar = avatar;
    }
}

class VideoModel {
    constructor({ owner, title, link } = { owner: 1, title: "", link: "" }) {
        this.id = idProvider(VIDEOS);
        this.owner = owner;
        this.title = title;
        this.link = link;
    }
}

module.exports = {
    UserModel,
    VideoModel,
}