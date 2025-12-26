const { createCustomer, listCustomers } = require("../controller/index.js");
const express = require("express");

const router = express.Router();

router.post("/customer/create", createCustomer);
router.get("/customer/list", listCustomers);
module.exports = router;