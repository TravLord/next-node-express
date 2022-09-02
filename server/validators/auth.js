const { check } = require('express-validator');

exports.userRegisterValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name is Required'),
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password')
    .isLength({min:6})
    .withMessage('Password must be over 6 characters.')
];