const { prisma } = require("../config/db.config");

class AppointmentRepository {
  async createAppointment(data, tx) {
    return tx.appointments.create({
      data,
      include: {
        slot: true,
      },
    });
  }

  async findAppointmentById(appointmentId, tx) {
    return await tx.appointments.findUnique({
      where: { id: appointmentId },
    });
  }

  async updateAppointment(appointmentId, newSlotId, tx) {
    return await tx.appointments.update({
      where: { id: appointmentId },
      data: { slot_id: newSlotId },
    });
  }

  async getUserAppointments(userId) {
    return await prisma.appointments.findMany({
      include: { slot: true, providers: true, users: true },
    });
  }

  async getProviderAppointments(providerId) {
    return await prisma.appointments.findMany({
      where: { provider_id: providerId },
      include: { slot: true, providers: true, users: true },
    });
  }

  async getAllAppointments() {
    return await prisma.appointments.findMany({
      include: { slot: true, providers: true, users: true },
    });
  }

  async findAppointmentById(appointmentId, tx) {
    return tx.appointments.findUnique({
      where: { id: appointmentId },
    });
  }

  async cancelAppointment(appointmentId, tx) {
    return tx.appointments.update({
      where: { id: appointmentId },
      data: { status: "CANCELLED" },
    });
  }
}

module.exports = new AppointmentRepository();
