import express from "express";
import post from "../controllers/posts.js";

const router = express.Router();

router.post("/post", post.create)
router.post("/post/:id", post.getAll);

router.route("/post/:id")
    .get(post.getById)
    .put(post.update)
    .delete(post.delete);

export default router;
