const express = require('express');
const { createOrder, listOrders } = require("../contoller/orderController.js");
const router = express.Router();

router.post('/create', createOrder);
router.get("/list", listOrders);

module.exports = router;