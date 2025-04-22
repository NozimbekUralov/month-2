import { PostModel, clientError, handleError } from "../models/index.js";
import { readFile, writeFile, serverConfig } from "../lib/index.js";

const { POSTS } = serverConfig;

class Post {
    constructor() {
        this.create = async (req, res) => {
            try {
                const data = await req.readData();
                const post = new PostModel(data);
                const posts = readFile(POSTS(), "json");
                posts.push(post);
                writeFile(POSTS(), posts);
                res.statusCode = 201;
                res.json({
                    message: "Post created successfully",
                    ok: true,
                    post
                });
            }
            catch (error) {
                handleError(error, res);
            }
        };

        this.getPosts = async (req, res) => {
            try {
                const { id } = await req.readData();
                const store = readFile(POSTS(), "json");
                const posts = store.filter((post) => post.author.id == id);
                if (!posts.length) throw new clientError("Posts not found", 404);
                res.json({
                    message: "Posts found",
                    ok: true,
                    posts
                });
            }
            catch (error) {
                handleError(error, res);
            }
        };

        this.update = async (req, res) => {
            try {
                const data = await req.readData();
                const store = readFile(POSTS(), "json");
                const postIndex = store.findIndex((post) => post.id == data.id);

                if (postIndex == -1) throw new clientError("Post not found", 404);
                store[postIndex] = { ...store[postIndex], ...data };
                writeFile(POSTS(), store);
                res.json({
                    message: "Post updated successfully",
                    ok: true,
                    post: store[postIndex]
                });
            }
            catch (error) {
                handleError(error, res);
            }
        };

        this.deletePost = async (req, res) => {
            try {
                const { id } = await req.readData();
                const store = readFile(POSTS(), "json");
                const postIndex = store.findIndex((post) => post.id == id);
                if (postIndex == -1) throw new clientError("Post not found", 404);
                store.splice(postIndex, 1);
                writeFile(POSTS(), store);
                res.json({
                    message: "Post deleted successfully",
                    ok: true
                });
            }
            catch (error) {
                handleError(error, res);
            }
        };
    }
}
export default new Post();