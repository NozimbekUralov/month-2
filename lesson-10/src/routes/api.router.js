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
router.delete("/tasks/:id", authGuard, taskController.delete);
router.put("/tasks/:id", authGuard, taskController.update);
router.get("/tasks", authGuard, taskController.getAll);


module.exports = router;