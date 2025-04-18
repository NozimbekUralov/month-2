import DB from '../model/index.js';

class Controller {
    #db
    constructor() {
        this.#db = new DB();
    }

    async createUser({ name }) {
        try {
            const user = this.#db.user;
            const users = this.#db.read();
            if (!name) throw new Error("name is required", { cause: 400 })
            user.name = name;
            users.push(user);
            await this.#db.write(users);

            return {
                success: true,
                data: user,
                status: 201,
                message: "user created"
            }
        } catch (err) {
            return {
                success: false,
                data: null,
                status: err.cause,
                message: err.message
            }
        }
    }

    async updateUser({ name, id }) {
        try {
            const users = this.#db.read();
            const index = users.findIndex(u => u.id == id);
            if (index == -1) {
                throw new Error("user not found", { cause: 404 });
            }
            const user = users[index];
            user.name = name;
            await this.#db.write(users);

            return {
                success: true,
                data: user,
                status: 200,
                message: "user updated"
            }
        } catch (error) {
            return error;
        }
    }

    async deleteUser({ id }) {
        try {
            const users = this.#db.read();
            const index = users.findIndex(u => u.id == id);

            if (index == -1) {
                throw new Error("user not found", { cause: 404 });
            }
            const user = users[index];
            users.splice(index, 1);
            await this.#db.write(users);

            return {
                success: true,
                data: user,
                status: 200,
                message: "user deleted"
            }
        } catch (error) {
            return {
                success: false,
                data: null,
                status: error.cause,
                message: error.message
            };
        }
    }

    async getUsers() {
        const users = this.#db.read();

        return {
            success: true,
            data: users,
            status: 200,
            message: "users fetched"
        }
    }
}

const controller = new Controller();

export default controller;