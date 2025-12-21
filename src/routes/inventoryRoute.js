const express = require("express");
const { updateStock, createInventory } = require("../controllers/inventoryController");
const router = express.Router();

router.post('/create', createInventory);
router.post('/update', updateStock);


module.exports = router;