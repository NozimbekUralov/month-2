const express = require('express');
const viewsController = require("../controllers/views")

const router = express.Router();

router.use(express.static(process.cwd() + "/public"))

router.get("/", viewsController.INDEX);
router.get("/admin", viewsController.ADMIN);
router.get("/login", viewsController.LOGIN);
router.get("/register", viewsController.REGISTER);

module.exports = router;