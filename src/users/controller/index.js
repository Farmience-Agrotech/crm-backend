const { registerUser } = require("./register-user.js");
const { loginUser } = require("./login-user.js");
const { listUsers } = require("./list-users.js");
const { createRole } = require("./create-roles.js");
const { updateRole } = require("./upate-role.js");
const { deleteRole } = require("./delete-role.js");
const { listRoles } = require("./list-roles.js");



module.exports = {
    registerUser,
    loginUser,
    listUsers,
    createRole,
    updateRole,
    deleteRole,
    listRoles,
}