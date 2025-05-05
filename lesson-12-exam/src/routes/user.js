const express = require("express");

const userController = require("../controllers/user");
const { fileInterceptor, valFileTitle } = require("../middlewares");

const router = express.Router();

router.get("/me", userController.ME);
router.get("/all", userController.ALL_USERS);
router.route("/videos/:id")
    .get(userController.USER_VIDEOS)
    .put(valFileTitle, userController.UPDATE_VIDEO)
    .delete(userController.DELETE_VIDEO);
router.post("/upload", fileInterceptor, valFileTitle, userController.UPLOAD_VIDEO);

module.exports = router;