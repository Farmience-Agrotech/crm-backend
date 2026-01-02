const {
    createCategory,
    getAllCategories,
    updateCategory,
} = require("../controllers/index.js");

const express = require("express");
const {deleteCategory} = require("../controllers");

const router = express.Router();

router.post("/category/create", createCategory);
router.get("/category/list", getAllCategories);
router.patch("/category/update/:id", updateCategory);
router.delete("/category/delete/:id", deleteCategory);
module.exports = router;