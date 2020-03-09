const axios = require('axios');
const places = require('../../../lib/places');

module.exports = {
    getHome: (req, res, next) => {
        return res.render('main/home');
    },

    getWeather: async(req, res, next) => {
        try {
            if (req.query.location) {
                const location = await places.filter((place) => place.location === req.query.location);
                const response = await axios.get(`https://api.darksky.net/forecast/${process.env.API_KEY}/${location[0].lat},${location[0].long}?units=us`);
                const currentWeather = response.data;
                res.render('auth/weather', { currentWeather, places, location });
            } else {
                const location = await places.filter((place) => place.location === 'NYC');
                const response = await axios.get(`https://api.darksky.net/forecast/${process.env.API_KEY}/${location[0].lat},${location[0].long}?units=us`);
                const currentWeather = response.data;
                res.render('auth/weather', { currentWeather, places, location });
            }
        } catch (error) {
            console.log('error!!!', error);
            res.redirect('/');
        }
    }
}