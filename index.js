require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');
const path = require("path");

app.use(express.static(path.join(__dirname, "build")));

// Setting the port for the server to listen on
const port = process.env.PORT;

// Importing the mongoose configuration to connect to the MongoDB database
require('./config/mongoose');

// Importing Passport for authentication and the JWT strategy configuration
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy.js');

// Importing Passport-google-oauth for authentication 
// const googleOauth = require('./config/passport-google-oauth-strategy.js');



app.use(express.static(path.join(__dirname, "dist")));
app.use(cors());

app.use(bodyParser.json());
// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

// Set up cookie-session middleware
app.use(
    cookieSession({
      name: 'session',
      keys: [process.env.COOKIE_KEY], 
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
  );    


// Initializing Passport middleware
app.use(passport.initialize());
app.use(passport.session());



// app.use('/auth', googleOauth);

// Using the Google OAuth strategy
// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));



// Using the routes defined in the 'index' file
app.use('/', require('./route'));

// Setting up the server to listen on the specified port
app.listen(port, (error) => {
    // Handling errors and logging server status
    if (error) {
        console.log(`Error in creating server. Error is: ${error}`);
    }
    console.log(`Server is up and running on the port: ${port}`);
});
