import fs from 'node:fs'

import { readFile, serverConfig } from "../lib/index.js";
const { POSTS } = serverConfig;

export class PostModel {
    #posts = POSTS();
    constructor({ title, content, author }) {
        if (!fs.existsSync(this.#posts)) {
            fs.writeFileSync(this.#posts, JSON.stringify([]));
        }

        this.id = readFile(this.#posts, 'json').length ? readFile(this.#posts, 'json').length + 1 : 1;
        this.title = title;
        this.content = content;
        this.author = author;
    }
}
