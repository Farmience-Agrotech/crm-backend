const express = require("express");
const { updateStock, createInventory, getInventory } = require("../controller/inventoryController");
const { protect, authorize} = require("../../utils/authMiddleware.js");
const router = express.Router();

router.post(
    '/create',
    protect,
    authorize("inventory.create"),
    createInventory);

router.post('/update',
    protect,
    authorize("inventory.update"),
    updateStock);

router.get('/list',
    protect,
    authorize("inventory.list"),
    getInventory);


module.exports = router;