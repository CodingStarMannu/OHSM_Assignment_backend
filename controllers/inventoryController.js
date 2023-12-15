const Inventory = require('../models/inventory');

exports.createInventory = async (req, res) => {
  try {
    const inventoryData = req.body;
    const inventory = new Inventory(inventoryData);
    const savedInventory = await inventory.save();
    res.status(201).json(savedInventory);
  } catch (error) {
    console.error('Error creating inventory:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


