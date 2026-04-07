const { prisma } = require("../config/db.config");
const appointmentRepo = require("../repositories/appointment.repository");
const providerRepo = require("../repositories/provider.repository");
const slotRepo = require("../repositories/slot.repository");
const AppError = require("../utils/appError");
const { convertToIST } = require("../utils/time");

class AppointmentService {
  async createAppointment(userId, dto) {
    const { slotId } = dto;

    return await prisma.$transaction(async (tx) => {
      const slot = await slotRepo.findByIdForUpdate(slotId, tx);
      console.log(slot);

      if (!slot) {
        throw new AppError("Slot not found", 404);
      }

      if (slot.is_booked) {
        throw new AppError("Slot already booked", 400);
      }

      if (new Date(slot.start_time) < new Date()) {
        throw new AppError("Cannot book past slot", 400);
      }

      const appointment = await appointmentRepo.createAppointment(
        {
          user_id: userId,
          provider_id: slot.provider_id,
          slot_id: slot.id,
          status: "BOOKED",
        },
        tx,
      );

      await slotRepo.markAsBooked(slotId, tx);

      return appointment;
    });
  }

  async getUserAppointments(userId) {
    return await appointmentRepo.getUserAppointments(userId);
  }

  async getProviderAppointments(userId) {
    const provider = await providerRepo.findProviderByUserId(userId);

    if (!provider) {
      throw new AppError("Provider not found", 404);
    }

    return await appointmentRepo.getProviderAppointments(provider.id);
  }

  async getAllAppointments() {
    return await appointmentRepo.getAllAppointments();
  }

  async rescheduleAppointment(user, dto) {
    const { appointmentId, newSlotId } = dto;

    console.log(dto);

    return await prisma.$transaction(async (tx) => {
      const appointment = await appointmentRepo.findAppointmentById(
        appointmentId,
        tx,
      );

      if (!appointment) {
        throw new AppError("Appointment not found", 404);
      }

      if (appointment.user_id !== user.id) {
        throw new AppError("Unauthorized", 403);
      }

      const result = await slotRepo.findByIdForUpdate(newSlotId, tx);

      if (!result) {
        throw new AppError("Slot not found", 404);
      }

      if (result.is_booked) {
        throw new AppError("Slot is already booked", 400);
      }

      await slotRepo.markAsAvailable(appointment.slot_id, tx);

      await slotRepo.markAsBooked(newSlotId, tx);

      await appointmentRepo.updateAppointment(appointment.id, newSlotId, tx);

      return { message: "Recheduled successfully" };
    });
  }

  async cancelAppointment(user, appointmentId) {
    return await prisma.$transaction(async (tx) => {
      const appointment = await appointmentRepo.findAppointmentById(
        appointmentId,
        tx,
      );

      if (!appointment) {
        throw new AppError("Appointment not found", 404);
      }

      if (user.role === "USER" && appointment.user_id !== user.id) {
        throw new AppError("Unauthorized", 403);
      }

      await appointmentRepo.cancelAppointment(appointmentId, tx);

      await slotRepo.markAsAvailable(appointment.slot_id, tx);

      return { message: "Appointment cancelled successfully" };
    });
  }
}

module.exports = new AppointmentService();
