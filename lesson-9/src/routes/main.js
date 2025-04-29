import express from "express";
import userController from "../controllers/users.js";
import postRouter from "./post.js";
import { authGuard } from "../middlewares/index.js";

const router = express.Router();

router.post("/auth/register", userController.REGISTER);
router.post("/auth/login", userController.LOGIN);

router.route("/user")
    .put(authGuard, userController.UPDATE)
    .delete(authGuard, userController.DELETE);

router.use(postRouter)

export default router;