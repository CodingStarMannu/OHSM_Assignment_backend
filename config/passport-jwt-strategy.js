// Importing necessary modules for passport and JWT authentication
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT =  require('passport-jwt').ExtractJwt;

// Importing the User model for database interaction
const User = require('../models/user');

// Configuration options for the JWT strategy
var opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(), // Extracting JWT from the Authorization header
    secretOrKey : 'manoj1234' // Secret key for JWT verification
}

// Setting up a new JWT authentication strategy using Passport
passport.use(new JWTStrategy(opts, async (jwtPayload, done) => {
    try {
        // Finding the user in the database based on the user ID from the JWT payload
        const user = await User.findById(jwtPayload._id);
      
        // If the user is found, return the user
        if (user) {
            return done(null, user);
        } else {
            // If the user is not found, return false
            return done(null, false);
        }
    } catch (err) {
        // Handling errors and logging an error message
        console.log('Error in finding the User from JWT');
        return done(err, false);
    }
}));

// Exporting the configured passport for use in other files
module.exports = passport;
