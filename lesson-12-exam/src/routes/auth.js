const express = require("express");
const auth = require("../controllers/auth");
const { fileInterceptor } = require("../middlewares");

const router = express.Router();

router.post("/register", fileInterceptor, auth.REGISTER);
router.post("/login", auth.LOGIN);

module.exports = router