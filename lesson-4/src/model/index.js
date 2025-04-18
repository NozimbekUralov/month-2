import fs from 'fs';
import path from 'path';

export default class DB {
    #db = '/db.json';
    #currentPath = path.join(path.resolve() + this.#db);
    constructor() {
        if (!fs.existsSync(this.#currentPath)) {
            fs.writeFileSync(this.#currentPath, "[]");
        }
    }

    get user() {
        const data = this.read();
        return {
            id: data.length ? data[data.length - 1].id + 1 : 1,
            name: "name"
        }
    }

    read() {
        return JSON.parse(fs.readFileSync(this.#currentPath, 'utf-8'));
    }

    async write(data) {
        fs.writeFileSync(this.#currentPath, JSON.stringify(data, null, 4));
        return data;
    }
}
