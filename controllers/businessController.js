const Business = require('../models/business');
const User = require('../models/user');

exports.setupBusiness = async function (req, res) {
    try {
        console.log("Coming from backend setupBusiness function", req.body);
        const userId = req.user._id;
        const user = await User.findById(userId);

            const businessData = {
                propertyType: req.body.propertyType,
                propertyName: req.body.propertyName,
                phoneNumber: req.body.phoneNumber,
                email: user.email,
                address: req.body.address,
                state: req.body.state,
                city: req.body.city,
                pincode: req.body.pincode,
            };
            console.log("This is business Data", businessData);

            const business = new Business(businessData);
            await business.save();    
        
    
        res.status(201).json({ message: 'Business setup successful' });
    } catch (error) {
        console.error('Error setting up business:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
