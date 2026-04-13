const { z } = require("zod");

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  contact: z.string().regex(/^[6-9]\d{9}$/,"Invalid contact number").optional().or(z.literal("")),
  img_url: z
  .string()
  .refine((val) => {
    if (!val) return true; // allow empty

    // check if it's a valid URL
    const isUrl = /^https?:\/\/.+/.test(val);

    // check if it's local path
    const isLocal = val.startsWith("/");

    return isUrl || isLocal;
  }, "Invalid image path")
  .optional()
  .or(z.literal(""))
});

const updateUserSchema = z.object({
  name: z.string().min(2).optional(),

  contact: z
    .string()
    .regex(/^(\+91)?[6-9]\d{9}$/, "Invalid contact")
    .optional(),

  img_url: z
  .string()
  .refine((val) => {
    if (!val) return true; // allow empty

    // check if it's a valid URL
    const isUrl = /^https?:\/\/.+/.test(val);

    // check if it's local path
    const isLocal = val.startsWith("/");

    return isUrl || isLocal;
  }, "Invalid image path")
  .optional()
  .or(z.literal(""))
})

const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
  });

module.exports = {
  loginSchema,
  registerSchema,
  updateUserSchema
};