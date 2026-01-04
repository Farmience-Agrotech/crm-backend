const { createProduct, listProducts, deleteProduct, updateProducts } = require('../controller/index.js');
const express = require("express");
const {protect, authorize} = require("../../utils/authMiddleware");


const router = express.Router();

router.post('/create',
    protect,
    authorize("product.create"),
    createProduct);

router.get("/list",
    protect,
    authorize("product.list"),
    listProducts);

router.delete("/delete/:productId",
    protect,
    authorize("product.delete"),
    deleteProduct);

router.patch("/update",
    protect,
    authorize("product.update"),
    updateProducts );

module.exports = router;