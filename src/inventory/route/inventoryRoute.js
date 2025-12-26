const express = require("express");
const { updateStock, createInventory, getInventory } = require("../controller/inventoryController");
const router = express.Router();

router.post('/create', createInventory);
router.post('/update', updateStock);
router.get('/list', getInventory);


module.exports = router;