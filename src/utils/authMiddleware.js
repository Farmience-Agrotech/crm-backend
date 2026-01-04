const jwt = require('jsonwebtoken');
const { Users } = require('../users/model/user.js');
const { Roles } = require('../users/model/role-schema.js');

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "fd3295cf11b2d638cfa5acd4e0fa938c");

            // Attach user info to request
            // Note: We trust the token data for speed, or you can fetch DB here
            req.user = decoded;

            next();
        } catch (error) {
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ error: 'Not authorized, no token' });
    }
};

// Updated Authorize: Checks for SPECIFIC PERMISSIONS (Fine Grain)
// Usage: authorize('user.create') or authorize('user.view')
exports.authorize = (requiredPermission) => {
    return async (req, res, next) => {
        try {
            if (req.user.type === 'SUPER_ADMIN') return next();

            // Fetch the Role from DB to check current permissions
            const userRole = await Roles.findById(req.user.role);

            if (userRole && userRole.permissions.includes(requiredPermission)) {
                return next();
            } else {
                return res.status(403).json({ error: 'Forbidden: You do not have permission' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
};