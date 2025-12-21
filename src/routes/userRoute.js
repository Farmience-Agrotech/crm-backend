const express = require('express')
const router = express.Router()
const { registerUser, listUsers, loginUser } = require("../controllers/userController.js");
const { authorize, protect } = require("../middlewares/authMiddleware.js");

router.post("/register", registerUser);
router.post("/login", loginUser)
router.get("/list", protect, authorize("ADMIN"), listUsers);

module.exports =router;
