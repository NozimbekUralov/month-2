const express = require("express");
const fileUpload = require("express-fileupload");

const { authMiddleware, jwtAuthGuard } = require("../middlewares");

const authRouter = require("./auth");
const userRouter = require("./user");

const router = express.Router();

router.use(fileUpload());
router.use(express.json());

router.use("/auth", authMiddleware, authRouter);
router.use("/user", jwtAuthGuard, userRouter);

router.use(express.static(process.cwd() + "/uploads"))

module.exports = router;