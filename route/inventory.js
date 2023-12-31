const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/create', inventoryController.createInventory);

module.exports = router;