import fs from 'node:fs';

import { serverConfig, readFile } from '../lib/index.js';

const { USERS } = serverConfig;

export class UserModel {
    #users = USERS();
    constructor({ name, email, password }) {
        if (!fs.existsSync(this.#users)) {
            fs.writeFileSync(this.#users, JSON.stringify([]));
        }

        this.id = readFile(this.#users, 'json').length ? readFile(this.#users, 'json').length + 1 : 1;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}