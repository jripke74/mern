const { Router } = require('express');

const userController = require('../controllers/users-controllers');

const router = Router();

router.get('/', userController.getUsers);

router.post('/signup', userController.signup);

router.post('/login', userController.login);

module.exports = router;
