const { Users } = require("../model/user.js");
const jwt = require("jsonwebtoken");
const { Roles } = require("../model/role-schema.js");

exports.loginUser = async ( req, res ) => {
    try {
        const {
            userName,
            password
        } = req.body;

        const user = await Users.findOne({ userName }).populate("role");

        if ( !user || !(await user.comparePassword(password) ) ) {
            return res.status(401).send("Invalid Credentials");
        }

        const tokenPayload = {
            id: user._id,
            company: user.company,
            type: user.type,
            role: user.role ? user.role._id : null,
        };

        const token = jwt.sign(
            tokenPayload,
            "fd3295cf11b2d638cfa5acd4e0fa938c",
            { expiresIn: "1d" }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                userName: user.userName,
                company: user.company,
                role: user.role
            }
        });

    } catch ( error ) {
        res.status(500).json({
            error: error.message,
        })
    }
}