const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');
const User = require('../models/user');
require('dotenv').config();


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8000/user/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done){

    try{
        //find a user
        const user = await User.findOne({email: profile.emails[0].value}).exec();

            console.log(profile);
            console.log(accessToken, refreshToken);

            if(user){
                //if found set this a req.user
                return  done(null,user);
            }else{
                // if not found ,create the user and set it as req.user 
             const newUser =  await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),
                });
                return done(null,newUser);
            }
     }catch(err){
        console.log("Error in google strategy passport" , err);
        return done(err, null);
    }
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done)=> {
    User.findById(id).then ( user =>{
      done(null, user);
    });
  });


module.exports = passport;