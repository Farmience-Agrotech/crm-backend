const { Roles } = require("../model/role-schema.js");

exports.listRoles = async (req, res) => {
    try {
        const userCompany = req.user.company;
        const roles = await Roles.find({
            $or: [
                { company: userCompany },
                { isSystemRole: true }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json({
            count: roles.length,
            roles
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};