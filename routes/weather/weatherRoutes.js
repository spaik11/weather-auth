const express = require('express');
const router = express.Router();
const { isAuth } = require('../users/utils/userValidation');

const {
  getHome,
  getWeather,
} = require('./controllers/weatherController');

router.get('/', getHome);
router.get('/auth/weather', isAuth, getWeather);

module.exports = router;
