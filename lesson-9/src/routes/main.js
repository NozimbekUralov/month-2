import express from "express";
import userController from "../controllers/users.js";
import postRouter from "./post.js";

const router = express.Router();

router.post("/auth/register", userController.REGISTER);
router.post("/auth/login", userController.LOGIN);
router.put("/users/:id", userController.UPDATE);
router.delete("/users/:id", userController.DELETE);
router.use(postRouter)

export default router;