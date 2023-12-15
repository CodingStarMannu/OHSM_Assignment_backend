const express = require('express');
const router = express.Router();

// Importing the Passport module for authentication
const passport = require('../config/passport-jwt-strategy'); 


console.log("Router Loaded")


// Using the doctor routes defined in the 'doctor' file
router.use('/user', require('./userRoutes'));
router.use('/business', require('./business'));
router.use('/inventory', require('./inventory'));


module.exports = router;