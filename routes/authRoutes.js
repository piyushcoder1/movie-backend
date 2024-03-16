// routes/users.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const usersController = require('../controllers/authController');

router.post(
  '/register',
  [
    check('username', 'Username is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  usersController.register
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  usersController.login
);

module.exports = router;
