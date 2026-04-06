const { z } = require("zod");

const createProviderSchema = z.object({
  email: z.string().email("Invalid email format"),
  specialization: z
    .string()
    .min(2, "Specialization must be at least 2 characters"),
  experience_years: z
    .number({ invalid_type_error: "Experience must be a number" })
    .min(0, "Experience cannot be negative"),
});

module.exports = {
  createProviderSchema,
};