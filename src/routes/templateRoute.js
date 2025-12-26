const {
    createTemplate,
    getTemplate,
    deleteTemplate
} = require("../controllers/TemplateController");

const express = require("express");


const router = express.Router();

router.post("/templates/create", createTemplate);
router.get("/templates/list", getTemplate);
router.delete("/templates/delete/:templateId", deleteTemplate);

module.exports = router;