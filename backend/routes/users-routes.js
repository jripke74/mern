const { Router } = require('express');
const { check } = require('express-validator');

const userController = require('../controllers/users-controllers');

const router = Router();

router.get('/', userController.getUsers);

router.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  userController.signup
);

router.post('/login', userController.login);

module.exports = router;
