const { Roles } = require("../model/role-schema.js"); // Adjust path if needed

exports.createRole = async (req, res) => {
    try {
        const { name, permissions } = req.body;
        const userCompany = req.user.company;

        const existingRole = await Roles.findOne({
            name: name,
            company: userCompany
        });

        if (existingRole) {
            return res.status(400).json({
                error: "A role with this name already exists in your company"
            });
        }

        const newRole = await Roles.create({
            name,
            permissions,
            company: userCompany,
            isSystemRole: false
        });

        res.status(201).json({
            message: "Role created successfully",
            role: newRole
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};