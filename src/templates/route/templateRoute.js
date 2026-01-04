const {
    createTemplate,
    getTemplate,
    deleteTemplate
} = require("../controller/templateController");

const express = require("express");
const {protect, authorize} = require("../../utils/authMiddleware");


const router = express.Router();

router.post("/templates/create",
    protect,
    authorize("template.create"),
    createTemplate);

router.get("/templates/list",
    protect,
    authorize("template.list"),
    getTemplate);

router.delete("/templates/delete/:templateId",
    protect,
    authorize("template.delete"),
    deleteTemplate);

module.exports = router;