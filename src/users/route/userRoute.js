const express = require('express')
const router = express.Router()
const { registerUser, listUsers, loginUser, createRole, deleteRole, updateRole } = require("../controller/index");
const { authorize, protect } = require("../../utils/authMiddleware.js");
const {listRoles} = require("../controller");

router.post("/login", loginUser);



router.post("/register", protect, authorize("user.create"), registerUser);
// router.post("/login", loginUser)
router.get("/list", protect, authorize("user.view"), listUsers);

router.post("/role/create", protect, authorize("role.create"), createRole);
router.patch("/role/update/:id", protect, authorize("role.edit"), updateRole);
router.delete("/role/delete/:id", protect, authorize("role.delete"), deleteRole);
router.get("/role/list", protect, authorize("role.view"), listRoles);
// Roles


module.exports = router;
