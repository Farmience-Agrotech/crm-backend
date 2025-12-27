const { createProduct } = require("./create-products.js");
const { listProducts } = require("./list-products.js");
const { deleteProduct } = require("./delete-products.js");
const { updateProducts } = require("./update-products.js");

module.exports = {
    createProduct,
    listProducts,
    deleteProduct,
    updateProducts
}