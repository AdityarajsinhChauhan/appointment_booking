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

  async findById(slotId, tx) {
    return await tx.availability_slots.findUnique({
      where: { id: slotId },
    });
  }

  async findByIdForUpdate(slotId, tx) {
    const result = await tx.$queryRaw`
      SELECT * FROM availability_slots
      WHERE id = ${slotId}::uuid
      FOR UPDATE
    `;
    return result[0];
  }

  async markAsBooked(slotId, tx) {
    return await tx.availability_slots.update({
      where: { id: slotId },
      data: { is_booked: true },
    });
  }

  async getUserAppointments(userId) {
    return await prisma.appointments.findMany({
      where: { user_id: userId },
      include: { slot: true },
    });
  }

  async getProviderAppointments(providerId) {
    return await prisma.appointments.findMany({
      where: { provider_id: providerId },
      include: { slot: true },
    });
  }

  async getAllAppointments() {
    return await prisma.appointments.findMany({
      include: { slot: true },
    });
  }
}

module.exports = new AppointmentRepository();
