const { createQuotation, updateQuotation, listQuotations } = require("../controller/index.js");
const express = require("express");


const router =  express.Router();

router.post("/quotation/create", createQuotation);
router.patch("/quotation/update", updateQuotation);
router.get("/quotation/list", listQuotations);

module.exports = router;