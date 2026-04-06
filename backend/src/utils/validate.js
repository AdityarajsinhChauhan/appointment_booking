const AppError = require("./appError");

const validate = (schema, data) => {
  try {
    return schema.parse(data);
  } catch (err) {
    console.error("ZOD FULL ERROR:", err); // 👈 ADD THIS

    // 👇 FIX: support both formats
    const message =
      err?.issues?.[0]?.message || // ✅ correct for Zod
      err?.errors?.[0]?.message ||
      err.message ||
      "Invalid input";

    throw new AppError(message, 400, "VALIDATION_ERROR");
  }
};

module.exports = validate;