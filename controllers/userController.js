// Importing necessary modules and files
const User = require('../models/user'); // Importing the User model
const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken library for token generation

// Controller function to handle user creation
module.exports.create = async function (req, res){


    console.log("Coming from backend create function",req.body); 
    try{
        // Checking if a user with the same username already exists
        let user = await User.findOne({email:req.body.email});

        if(user){
            // If user already exists, return a conflict status with a message
            return res.status(409).json({
                message:'Username Already Exists'
            });
        }

        // Creating a new user with the provided details
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password:req.body.password,
        });

        // Sending a success message if the user is created successfully
        res.status(201).json({
            message: 'User created Successfully'
        });

    } catch(err){
        // Handling errors and sending an internal server error status
        console.log('Error', err);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

// Controller function to handle user authentication and token creation
module.exports.createSession = async function (req,res){

    console.log("Coming from backend createSession function",req.body); 
    try{
        // Finding the user with the provided username in the request
        let user = await User.findOne({email:req.body.email});

        // Checking if the user exists and if the provided password matches
        if(!user || user.password != req.body.password){
            // If not, return an unprocessable entity status with an error message
            return res.status(422).json({
                message:'Invalid Username Or Password!'
            });
        }

        // If authentication is successful, create a token using jsonwebtoken
        return res.status(200).json({
            message:'Sign in Successful. Here is your token, Please Keep it safe!',
            data: {
                token: jwt.sign(user.toJSON(),'manoj1234', {expiresIn:'100000000'})
            }
        });

    } catch(err){
        // Handling errors and sending an internal server error status
        console.log('Error', err);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}
