const express = require('express');
const authController = require('../controllers/auth.controller');
const taskController = require('../controllers/task.controller');
const { authGuard } = require('../middlewares');

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.route("/user")
    .put(authGuard, authController.update)
    .delete(authGuard, authController.delete);

router.post("/task", authGuard, taskController.create);
router.get("/tasks", authGuard, taskController.getAll);
router.route("/tasks/:id")
    .delete(authGuard, taskController.delete)
    .put(authGuard, taskController.update)
    .patch(authGuard, taskController.updateStatus);


module.exports = router;