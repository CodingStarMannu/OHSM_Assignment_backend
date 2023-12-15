
const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema(
    {
        propertyType: {
            type: String,
            required:true,
        },
        propertyName: {
            type: String,
            required:true,
        },
        phoneNumber: {
            type: String,
            required:true,
            unique: true 
        },
        email: {
            type: String,
            required: true,
        },
        address:  {
            type: String,
            required:true,
        },
        state: {
            type: String,
            required:true,
        }, 
        city:  {
            type: String,
            required:true,
        },
        pincode:  {
            type: String,
            required:true,
        },
    },
    {
        timestamps:true
    }
);

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
