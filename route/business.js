const express = require('express');
const router = express.Router();

const businessController = require('../controllers/businessController');
const passport = require('../config/passport-jwt-strategy'); 

router.post('/setup', passport.authenticate('jwt', { session: false }), businessController.setupBusiness);




module.exports = router;