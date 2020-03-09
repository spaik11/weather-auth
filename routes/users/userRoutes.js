const express = require('express');
const router = express.Router();
const { userValidation } = require('./utils/userValidation');
require('../../lib/passport');

const { 
  getLogin,
  getRegister,
  register,
  login,
  logout
} = require('../users/controllers/userController');

router.get('/login', getLogin);
router.get('/register', getRegister);
router.get('/logout', logout);

router.post('/register', userValidation, register);
router.post('/login', login);

module.exports = router;
