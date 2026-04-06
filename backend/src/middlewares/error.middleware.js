const errorMiddleware = (err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: {
      code: err.statusCode || 500,
      type: err.type || "SERVER_ERROR",
    },
  });
};

module.exports = errorMiddleware;