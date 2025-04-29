const express = require('express');
const viewController = require('../controllers/view.controller');
const router = express.Router();

router.get('/', viewController.index);
router.get('/auth/login', viewController.login);
router.get('/auth/register', viewController.register);

module.exports = router;