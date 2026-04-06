const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }
    const token = authHeader.split(" ").filter(Boolean)[1];

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: err,
    });
  }
};

module.exports = authMiddleware;
