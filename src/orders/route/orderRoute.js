const express = require('express');
const { createOrder, listOrders, updateOrder } = require("../contoller/orderController.js");
const router = express.Router();

router.post('/create', createOrder);
router.get("/list", listOrders);
router.patch("/update", updateOrder);


module.exports = router;