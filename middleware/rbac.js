/**
 * Role-Based Access Control (RBAC) Middleware
 * Enforces server-side authorization checks for Student, Faculty, and Admin roles.
 */

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: User role could not be confirmed.',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Access restricted. Role "${req.user.role.toUpperCase()}" is not authorized for this operation.`,
      });
    }

    next();
  };
};

module.exports = { authorize };
