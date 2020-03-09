const User = require('../models/User');
const passport = require('passport');
const { validationResult } = require('express-validator');

module.exports = {
    getLogin: (req, res, next) => {
        return res.render('auth/login', { title: 'Login Home', errors: req.flash('errors') });
    },

    getRegister: (req, res, next) => {
        return res.render('auth/register', { title: 'Register Home', errors: req.flash('errors') });
    },

    register: async (req, res, next) => {
        const errors = validationResult(req);
        const { name, email, password } = req.body;

        if (!errors.isEmpty()) return res.render('auth/register', { errors: errors.array() })

        let user = await User.findOne({ email });

        try {
            if (user) {
                res.send('User Exists');
                return req.flash('errors', 'User Already Exists');
            } else {
                user = await User.create({
                    name,
                    email,
                    password 
                });
    
                user.save()
                    .then((user) => {
                        req.login(user, (err) => {
                            if (err) {
                                return res.status(400).json({ confirmation: false, message: err});
                            } else {
                                return res.redirect('/auth/weather');
                            }
                        })
                    })
                    .catch((err) => next(err));
            };
        } catch (error) {
            return next(error);
        };
    },

    login: passport.authenticate('local-login', {
        successRedirect: '/auth/weather',
        failureRedirect: '/users/login',
        failureFlash: true
    }),

    logout: (req, res) => {
        req.logout();
        return res.redirect('/');
    }
}