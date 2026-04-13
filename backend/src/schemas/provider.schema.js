const { z } = require("zod");

const createProviderSchema = z.object({
  email: z.string().email("Invalid email format"),
  specialization: z
    .string()
    .min(2, "Specialization must be at least 2 characters"),
  experience_years: z
    .number({ invalid_type_error: "Experience must be a number" })
    .min(0, "Experience cannot be negative"),
  address: z.string().min(2, "Area is too short").optional().or(z.literal("")),
  area: z.string().min(2, "Area is too short").optional().or(z.literal("")),
  city: z.string().min(2, "City is too short").optional().or(z.literal("")),
  state: z.string().min(2, "State is too short").optional().or(z.literal("")),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Invalid pincode")
    .optional()
    .or(z.literal("")),
});

const getSlotsBNyProviderSchema = z.object({
  userId: z.string().uuid("Invalid user id"),
});

module.exports = {
  createProviderSchema,
  getSlotsBNyProviderSchema,
};
