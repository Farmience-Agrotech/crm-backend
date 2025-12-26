const { createProduct, listProducts, deleteProduct } = require('../controller/index.js');
const express = require("express");


const router = express.Router();

router.post('/create', createProduct);
router.get("/list", listProducts);
router.delete("/delete/:productId", deleteProduct);
module.exports = router;