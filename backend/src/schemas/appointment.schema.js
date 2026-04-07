const { z } = require("zod");

const createAppointmentSchema = z.object({
  slotId: z.string().uuid("Invalid slot ID"),
});

const cancelAppointmentSchema = z.object({
  appointmentId: z.string().uuid("Invalid appointment ID"),
});

const rescheduleAppointmentSchema = z.object({
  appointmentId: z.string().uuid("Invalid appointment ID"),
  newSlotId: z.string().uuid("Invalid new slot ID"),
});



module.exports = {
  createAppointmentSchema,
  cancelAppointmentSchema,
  rescheduleAppointmentSchema,
};