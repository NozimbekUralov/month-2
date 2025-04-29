const { UserModel } = require('../model/index');
const { myReadFile, myWriteFile, serverConfig, generateToken } = require('../utils');

const { USERS } = serverConfig;


class AuthController {
    async register(req, res) {
        const user = new UserModel(req.body);
        const store = await myReadFile(USERS);
        store.push(user);
        await myWriteFile(USERS, store);
        delete user.password;
        res.json({ message: "User registered", user });
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const store = await myReadFile(USERS);
            const idx = store.findIndex(user => user.email == email && user.password == password);
            if (idx === -1) throw new Error("Invalid email or password");
            const user = store[idx];
            delete user.password;
            const token = generateToken({ id: user.id })
            res.json({ message: "User logged in", user, token });
        } catch (err) {
            res.status(401).json({ message: err.message });
        }

    }

    async update(req, res) {
        try {
            const { id } = req.user;
            const store = await myReadFile(USERS);
            const idx = store.findIndex(user => user.id === id);
            if (idx === -1) throw new Error("User not found");
            store[idx] = { ...store[idx], ...req.body };
            await myWriteFile(USERS, store);
            res.json({ message: "User updated", user: store[idx] });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }


    async delete(req, res) {
        try {
            const store = await myReadFile(USERS);
            const idx = store.findIndex(user => user.id === req.user.id);
            if (idx === -1) return res.status(404).json({ message: "User not found" });
            store.splice(idx, 1);
            await myWriteFile(USERS, store);
            res.json({ message: "User deleted", user: store[idx] });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = new AuthController()