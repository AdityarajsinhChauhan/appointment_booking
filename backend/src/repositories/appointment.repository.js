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

  async findAppointmentById( appointmentId, tx){
    return await tx.appointments.findUnique({
      where: { id: appointmentId}
    })
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

  async markAsAvailable(slotId, tx){
    return await tx.availability_slots.update({
      where: { id: slotId },
      data: { is_booked: false}
    });
  }

 

  async updateAppointment( appointmentId, newSlotId, tx ){
    return await tx.appointments.update({
      where:{ id: appointmentId },
      data: { slot_id: newSlotId}
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

  async getAvailableSlots(providerId){
    return await prisma.availability_slots.findMany({
      where: { provider_id: providerId,
        is_booked: false,
        start_time: { gte: new Date()}
       },
       orderBy:{
        start_time: 'asc'
       }

    });

  }

  async findAppointmentById(appointmentId, tx) {
  return tx.appointments.findUnique({
    where: { id: appointmentId }
  });
}

async cancelAppointment(appointmentId, tx) {
  return tx.appointments.update({
    where: { id: appointmentId },
    data: { status: 'CANCELLED' }
  });
}
}

module.exports = new AppointmentRepository();
