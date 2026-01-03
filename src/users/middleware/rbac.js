const {
    Roles
} = require("../model/role-schema.js");

const can = ( requiredPermission ) => {
    return async ( req, res, next ) => {

        try {
            if ( req.user.type === "SUPER_ADMIN" ) {
                return next();
            }

            const userRole = await Roles.findById(req.user.role);

            if ( userRole && userRole.permissions.includes(requiredPermission)) {
                return next();
            }

            return res.status(403).json({
                error: "Permission denied",
            })
        } catch ( error ) {
            res.status(500).json({
                error: error.message
            })
        }


    }
}