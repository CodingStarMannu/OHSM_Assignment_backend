// models/inventory.js
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    propertySpaceName: {
      type: String,
      required: true,
    },
    propertyInventoryType: {
      type: String,
      required: true,
    },
    otherPropertyInventoryType: {
      type: String,
    },
    capacity: {
      type: Number,
      required: true,
    },
    amenities: {
      type: String,
    },
    availabilityStatus: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
