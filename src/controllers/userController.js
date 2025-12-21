const { Users } = require("../models/user.js");
const jwt = require("jsonwebtoken");
exports.registerUser = async ( req, res) => {
    try {
        const {
            userName,
            password,
            role
        } = req.body;

        const existingUser = await Users.findOne({ userName});

        if ( existingUser ) {
            return res.status(400).json({
                error: "User already exists"
            });
        }


        const newUser = await Users.create({
            userName,
            password,
            role
        })
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(200).json(userResponse);
    } catch ( error ) {
        res.status(500).json({error: error.message});
    }
}


exports.listUsers = async ( req, res) => {
    try {
        const users = await Users.find({}).lean();
        if ( !users ) {
            return res.status(404).json({error: "No users found"});
        }
        res.status(200).json({users});
    } catch ( error ) {
        res.status(500).json({error: error.message});
    }
}

exports.loginUser = async ( req, res) => {
    try {
        const {
            userName,
            password
        } = req.body;

        const user = await Users.findOne({ userName });

        if ( !user || !(await user.comparePassword(password)) ) {
            return res.status(401).json({error: "Invalid credentials"});
        }

        const token = jwt.sign({
            id: user._id, role: user.role
        }, "fd3295cf11b2d638cfa5acd4e0fa938c", {
            expiresIn: "1d"
        })

        res.status(200).json({token, role: user.role});
    } catch ( error ) {
        res.status(500).json({error: error.message});
    }
}