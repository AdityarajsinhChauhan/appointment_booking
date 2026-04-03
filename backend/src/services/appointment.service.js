const { prisma } = require("../config/db.config");
const appointmentRepo = require("../repositories/appointment.repository");
const providerRepo = require('../repositories/provider.repository');
const AppError = require("../utils/appError");

class AppointmentService {
  async createAppointment(userId, dto) {
    const { slotId } = dto;

    return await prisma.$transaction(async (tx) => {
      const slot = await appointmentRepo.findByIdForUpdate(slotId, tx);
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

      await appointmentRepo.markAsBooked(slotId, tx);

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
}

module.exports = new AppointmentService();
