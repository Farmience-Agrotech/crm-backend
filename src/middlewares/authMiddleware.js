const jwt = require("jsonwebtoken");
const authorize = ( ...allowedRoles ) => {
    return ( req, res, next) => {
        if ( !req.user || !allowedRoles.includes( req.user.role)) {
            return res.status(403).json({
                error: "Access denied: You do not have required permission."
            });
        }
        next();
    }
}

const protect = async ( req, res, next ) => {
    let token;
    if ( req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if ( !token ) {
        return res.status(401).json({ error: "Not authorized."});
    }

    try {
        req.user= jwt.verify(token, "fd3295cf11b2d638cfa5acd4e0fa938c");;
        next();
    } catch ( error ) {
        return res.status(401).json({error: "token failed."})
    }
}

module.exports = {
    authorize,
    protect
}