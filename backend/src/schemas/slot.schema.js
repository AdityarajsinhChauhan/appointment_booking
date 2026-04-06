const { z } = require("zod");

const bulkSlotSchema = z.object({
  start_time: z.string().datetime("Invalid start time"),
  end_time: z.string().datetime("Invalid end time"),
  slot_duration: z
    .number({ invalid_type_error: "Slot duration must be a number" })
    .min(1, "Slot duration must be at least 1 minute"),
});

const singleSlotSchema = z.object({
  start_time: z.string().datetime("Invalid start time"),
  end_time: z.string().datetime("Invalid end time"),
});

module.exports = {
  singleSlotSchema,
  bulkSlotSchema
};