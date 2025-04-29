import express from "express";
import post from "../controllers/posts.js";
import { authGuard } from "../middlewares/index.js";

const router = express.Router();

router.post("/post", authGuard, post.create)
router.get("/posts", authGuard, post.getAll);

router.route("/post/:id")
    .get(authGuard, post.getById)
    .put(authGuard, post.update)
    .delete(authGuard, post.delete);

export default router;
