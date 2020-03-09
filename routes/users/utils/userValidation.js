const { check } = require('express-validator');

module.exports = {
    userValidation: [
        check('name', 'Name is required').not().isEmpty(), 
        check('email', 'Please include a valid-email').isEmail(),
        check('password', 'Please create password of 3 or more characters').isLength({ min: 3 })
    ],
    isAuth: (req, res, next) => {
        if (!req.isAuthenticated()) return res.redirect('/');
        next();
    }
}
