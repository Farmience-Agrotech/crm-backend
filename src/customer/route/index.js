const { createCustomer, listCustomers, deleteCustomer, editCustomer } = require("../controller/index.js");
const express = require("express");

const router = express.Router();

router.post("/customer/create", createCustomer);
router.get("/customer/list", listCustomers);
router.delete("/customer/delete/:customerId", deleteCustomer);
router.patch("/customer/edit", editCustomer);

module.exports = router;