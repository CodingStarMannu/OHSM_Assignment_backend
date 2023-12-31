const mongoose = require('mongoose');
require('dotenv').config(); 

const DB = process.env.MONGODB_URI;

mongoose.connect(DB);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to MongoDB'));

db.once('open', (err) => {
    if(err){
        console.log(`Error in connecting Database: ${err}`);
    }
	console.log('Connected to Database :: Mongodb');
});

module.exports = mongoose;









