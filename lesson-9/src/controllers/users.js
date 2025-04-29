import { UserModel } from "../model/index.js";
import { config, generateToken, myReadFile, myWriteFile } from "../utils/index.js";
import sha256 from "sha256";

const { USERS } = config;

class UserController {
    async REGISTER(req, res) {
        const store = await myReadFile(USERS);
        const user = new UserModel(req.body);
        user.password = sha256(user.password);
        store.push(user);
        await myWriteFile(USERS, store);
        return res.send(user)
    }
    async LOGIN(req, res) {
        try {
            const store = await myReadFile(USERS);
            let { email, password } = req.body;
            password = sha256(password);
            const idx = store.findIndex((user) => user.email == email && user.password == password)
            if (idx == -1) throw new Error("User not found");
            const token = generateToken({ id: store[idx].id });
            const user = store[idx];
            user.token = token;
            delete user.password;
            return res.json(user);
        } catch (err) {
            res.json({ message: err.message })
        }
    }

    async UPDATE(req, res) {
        try {
            const store = await myReadFile(USERS);
            const { id } = req.user;
            const idx = store.findIndex((user) => user.id == id);
            if (idx == -1) throw new Error("User not found");
            store[idx] = { ...store[idx], ...req.body };
            await myWriteFile(USERS, store);
            const user = store[idx];
            delete user.password;
            return res.json(user);
        } catch (err) {
            res.json({ message: err.message })
        }
    }

    async DELETE(req, res) {
        try {
            const store = await myReadFile(USERS);
            const { id } = req.user;
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