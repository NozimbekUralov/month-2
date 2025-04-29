import { myReadFile, config, myWriteFile } from "../utils/index.js";
import { PostModel } from "../model/index.js";

const { POSTS, USERS } = config;


class PostController {
    async create(req, res) {
        try {
            const store = await myReadFile(POSTS);
            const data = await myReadFile(USERS);
            const user = data.filter((user) => user.id == req.user.id);
            delete user[0].password;
            const post = new PostModel({ ...req.body, author: user[0] });
            store.push(post);
            await myWriteFile(POSTS, store);
            return res.send(post)
        } catch (err) {
            res.json({ message: err.message })
        }
    }
    async getAll(req, res) {
        try {
            const { id } = req.user;
            const store = await myReadFile(POSTS);
            const posts = store.filter((post) => post.author.id == id)
            return res.json({ posts });
        } catch (err) {
            res.json({ message: err.message })
        }
    }
    async getById(req, res) {
        try {
            const store = await myReadFile(POSTS);
            const { id } = req.params;
            const idx = store.findIndex((post) => post.id == id);
            if (idx == -1) throw new Error("Post not found");
            const post = store[idx];
            return res.json(post);
        } catch (err) {
            res.json({ message: err.message })
        }
    }
    async update(req, res) {
        try {
            const store = await myReadFile(POSTS);
            const { id } = req.user;
            const idx = store.findIndex((post) => post.author.id == id);
            if (idx == -1) throw new Error("Post not found");
            store[idx] = { ...store[idx], ...req.body };
            await myWriteFile(POSTS, store);
            return res.json(store[idx]);
        } catch (err) {
            res.json({ message: err.message })
        }
    }
    async delete(req, res) {
        try {
            const store = await myReadFile(POSTS);
            const { id } = req.params;
            const { id: userId } = req.user;
            const idx = store.findIndex((post) => post.author.id == userId && post.id == id);
            if (idx == -1) throw new Error("Post not found");
            const post = store.splice(idx, 1);
            await myWriteFile(POSTS, store);
            return res.json(post[0]);
        } catch (err) {
            res.json({ message: err.message })
        }
    }
}

export default new PostController();