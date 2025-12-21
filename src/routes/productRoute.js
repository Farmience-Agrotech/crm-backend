const { createProduct, listProducts } = require('../controllers/productController');
const express = require("express");


const router = express.Router();

router.post('/create', createProduct);
router.get("/list", listProducts);

module.exports = router;