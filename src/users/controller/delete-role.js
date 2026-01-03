const { Roles } = require("../model/role-schema.js");

exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const userCompany = req.user.company;

        // 1. Find the role to ensure it belongs to this company
        const role = await Roles.findOne({ _id: id, company: userCompany });

        if (!role) {
            return res.status(404).json({ error: "Role not found" });
        }

        // 2. Prevent deleting System Roles
        if (role.isSystemRole) {
            return res.status(403).json({
                error: "Cannot delete system default roles."
            });
        }


        // 4. Delete
        await Roles.findByIdAndDelete(id);

        res.status(200).json({
            message: "Role deleted successfully",
            deletedId: id
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};