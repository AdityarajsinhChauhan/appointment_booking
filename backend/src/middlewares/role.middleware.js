const { success } = require("zod");

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success:false,
        message: "Unauthorized",
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Access Denied",
        });
      }

      next();
    } catch (err) {
      return res.status(500).json({
        success:false,
        message: "Role authorization error",
        error: err
      });
    }
  };
};

module.exports = authorizeRoles;
