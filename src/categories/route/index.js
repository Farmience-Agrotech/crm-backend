const {
    createCategory,
    getAllCategories,
    updateCategory,
} = require("../controllers/index.js");

const express = require("express");
const {deleteCategory} = require("../controllers");
const {protect, authorize} = require("../../utils/authMiddleware");

const router = express.Router();

router.post("/category/create",
    protect,
    authorize("category.create"),
    createCategory);
router.get("/category/list",
    protect,
    authorize("category.list"),
    getAllCategories);

router.patch("/category/update/:id",
    protect,
    authorize("category.update"),
    updateCategory);

router.delete("/category/delete/:id",
    protect,
    authorize("category.delete"),
    deleteCategory);
module.exports = router;