const {Users} = require("../model/user.js");
exports.listUsers = async (req, res) => {
    try {

        const currentUser = req.user;
        const users = await Users.find({
            company: currentUser.company,
        })
            .select("-password")
            .populate("role", "name permissions")
            .lean();

        if ( !users || users.length === 0 ) {
            return res.status(404).json({
                error: "No user found"
            })
        }

        res.status(200).json({
            users
        })




    } catch ( error ) {
        res.status(500).json({
            error: error.message
        });
    }
}