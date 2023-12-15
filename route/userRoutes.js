const express = require('express');
const router = express.Router();
const passport = require('../config/passport-jwt-strategy'); 
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const userController = require('../controllers/userController');

// Route for handling user registration (POST request)
router.post('/signup', userController.create);

// Route for handling user login (POST request)
router.post('/signin', userController.createSession);


router.get('/auth/google', passport.authenticate('google', {scope: ['profile','email']}));
// router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/user/signin'}), userController.createSession);
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to a page or send a response
    res.redirect('/');
  });




module.exports = router;