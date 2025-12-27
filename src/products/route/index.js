const { createProduct, listProducts, deleteProduct, updateProducts } = require('../controller/index.js');
const express = require("express");


const router = express.Router();

router.post('/create', createProduct);
router.get("/list", listProducts);
router.delete("/delete/:productId", deleteProduct);
router.patch("/update", updateProducts )
module.exports = router;