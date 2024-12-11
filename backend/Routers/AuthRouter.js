const express = require('express');
const { singup , login } = require('../Controllers/AuthController.js');
const {singupValidation, loginValidation} = require('../Middleware/AuthValidation.js');

const router = express.Router(); // Correctly initialize the router

// Define the signup route
router.post('/login', loginValidation, login);
router.post('/signup', singupValidation, singup);

module.exports = router;
