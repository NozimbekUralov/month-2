import { idProvider, config } from "../utils/index.js"

const { POSTS, USERS } = config;

export class UserModel {
    constructor({ name, email, password }) {
        this.id = idProvider(USERS);
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

export class PostModel {
    constructor({ title, content, author }) {
        this.id = idProvider(POSTS);
        this.title = title;
        this.content = content;
        this.author = author;
    }
}