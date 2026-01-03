const { Users } = require("../model/user.js");
const jwt = require("jsonwebtoken");
const { Roles } = require("../model/role-schema.js");

exports.registerUser = async ( req, res) => {
    try {
        const adminUser = req.user;
        const {
            userName,
            password,
            roleId
        } = req.body;

        const roleExists = await Roles.findOne({ _id: roleId, company: adminUser.company});

        if ( !roleExists) {
            return res.status(400).json({
                error: "Invalid role"
            })
        }

        const existingUser = await Users.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({
                error: "User already exists"
            })
        }

        const newUser = await Users.create({
            userName,
            password,
            type: "COMPANY_USER",
            role: roleId,
            company: adminUser.company
        });

        const userResponse = await newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            userResponse
        })

    } catch ( error ) {
        return res.status(500).json({
            error: error.message,
        })
    }
}