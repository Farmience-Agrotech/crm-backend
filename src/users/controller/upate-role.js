const { Roles } = require("../model/role-schema.js");

exports.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, permissions } = req.body;
        const userCompany = req.user.company;

        // 1. Find the role first to check ownership and system status
        const role = await Roles.findOne({ _id: id, company: userCompany });

        if (!role) {
            return res.status(404).json({ error: "Role not found" });
        }

        // 2. Prevent editing System Roles (Safety Mechanism)
        if (role.isSystemRole) {
            return res.status(403).json({
                error: "Cannot edit system default roles. Please create a new role instead."
            });
        }

        // 3. Check for name duplicates (if name is changing)
        if (name && name !== role.name) {
            const duplicate = await Roles.findOne({
                name: name,
                company: userCompany
            });
            if (duplicate) {
                return res.status(400).json({ error: "Role name already exists" });
            }
        }

        // 4. Update
        const updatedRole = await Roles.findByIdAndUpdate(
            id,
            { name, permissions },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Role updated successfully",
            role: updatedRole
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};