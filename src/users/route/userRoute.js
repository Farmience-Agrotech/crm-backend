const express = require('express')
const router = express.Router()
const { registerUser, listUsers, loginUser } = require("../controller/userController.js");
const { authorize, protect } = require("../middleware/authMiddleware.js");

router.post("/register", registerUser);
router.post("/login", loginUser)
router.get("/list", protect, authorize("ADMIN"), listUsers);

module.exports = router;
