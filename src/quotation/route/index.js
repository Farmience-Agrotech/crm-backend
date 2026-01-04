const { createQuotation, updateQuotation, listQuotations } = require("../controller/index.js");
const express = require("express");
const {protect, authorize} = require("../../utils/authMiddleware");


const router =  express.Router();

router.post("/quotation/create",
    protect,
    authorize("quotation.create"),
    createQuotation);

router.patch("/quotation/update",
    protect,
    authorize("quotation.update"),
    updateQuotation);

router.get("/quotation/list",
    protect,
    authorize("quotation.list"),
    listQuotations);

module.exports = router;