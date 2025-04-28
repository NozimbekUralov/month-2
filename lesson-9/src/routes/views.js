import express from "express";
import views from "../controllers/views.js";

const router = express.Router();

router.get("/", views.HOME);
router.get("/auth", views.AUTH);
router.get("/profile", views.PROFILE);


export default router;