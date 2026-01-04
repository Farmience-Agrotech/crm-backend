const express = require('express');
const { createOrder, listOrders, updateOrder } = require("../contoller/orderController.js");
const {protect, authorize} = require("../../utils/authMiddleware");
const router = express.Router();

router.post('/create',
    protect,
    authorize("order.create"),
    createOrder);


router.get("/list",
    protect,
    authorize("order.list"),
    listOrders);


router.patch("/update",
    protect,
    authorize("order.update"),
    updateOrder);


module.exports = router;