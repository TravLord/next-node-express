const express = require('express')
// gives ability to route requests
const router = express.Router();

// import validators
const {userRegisterValidator, userLoginValidator} = require('../validators/auth') //apply [] of registeration checks
const {runValidation} = require('../validators') //run validation


// where the requests are coming from and being routed to
// import from controllers destructuring export
// this way we can list each route/req type seperately passed into router
const {register, registerActivate, login} = require('../controllers/auth');


router.post('/register',userRegisterValidator, runValidation, register);
router.post('/register/activate',registerActivate);
router.post('/login',userLoginValidator, runValidation,login);


// adding router to exports object by default exports obj is empty by default
// then we export to server.js contoller/auth.js -> route/auth.js -> server.js
module.exports = router;

