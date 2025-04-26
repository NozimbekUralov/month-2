import { UserModel } from "../model/index.js";
import { config, myReadFile, myWriteFile } from "../utils/index.js";

const { USERS } = config;

class UserController {
    async REGISTER(req, res) {
        console.log(req.body);
        const store = await myReadFile(USERS);
        const user = new UserModel(req.body);
        store.push(user);
        await myWriteFile(USERS, store);
        return res.send(user)
    }
    async LOGIN(req, res) {
        try {
            const store = await myReadFile(USERS);
            const { email, password } = req.body;
            const idx = store.findIndex((user) => user.email == email && user.password == password)
            if (idx == -1) throw new Error("User not found");
            const user = store[idx];
            return res.json(user);
        } catch (err) {
            res.json({ message: err.message })
        }
    }

    async UPDATE(req, res) {
        try {
            const store = await myReadFile(USERS);
            const { id } = req.params;
            const idx = store.findIndex((user) => user.id == id);
            if (idx == -1) throw new Error("User not found");
            store[idx] = { ...store[idx], ...req.body };
            await myWriteFile(USERS, store);
            return res.json(store[idx]);
        } catch (err) {
            res.json({ message: err.message })
        }
    }

    async DELETE(req, res) {
        try {
            const store = await myReadFile(USERS);
            const { id } = req.params;
            const idx = store.findIndex((user) => user.id == id);
            if (idx == -1) throw new Error("User not found");
            const user = store.splice(idx, 1);
            await myWriteFile(USERS, store);
            return res.json(user[0]);
        } catch (err) {
            res.json({ message: err.message })
        }
    }
}

export default new UserController();