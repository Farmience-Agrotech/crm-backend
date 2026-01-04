const { createCustomer, listCustomers, deleteCustomer, editCustomer } = require("../controller/index.js");
const express = require("express");
const { protect, authorize } = require("../../utils/authMiddleware.js");
const router = express.Router();

router.post(
    "/customer/create",
    protect,
    authorize("customer.create"),
    createCustomer);


router.get(
    "/customer/list",
    protect,
    authorize("customer.view"),
    listCustomers);

router.delete(
    "/customer/delete/:customerId",
    protect,
    authorize("customer.delete"),
    deleteCustomer);


router.patch("/customer/edit",
    protect,
    authorize("customer.update"),
    editCustomer);

module.exports = router;