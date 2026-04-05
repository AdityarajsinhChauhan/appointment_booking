const { prisma } = require("../config/db.config");

class slotRepository {
  async getAvailableSlots(providerId) {
    return await prisma.availability_slots.findMany({
      where: {
        provider_id: providerId,
        is_booked: false,
        start_time: { gte: new Date() },
      },
      orderBy: {
        start_time: "asc",
      },
    });
  }

  async getSlotsByDate(providerId, startUTC, endUTC) {
  return await prisma.availability_slots.findMany({
    where: {
      provider_id: providerId,
      start_time: {
        gte: startUTC,
        lt: endUTC,
      },
    },
    orderBy: {
      start_time: "asc",
    },
  });
}

  async markAsAvailable(slotId, tx) {
    return await tx.availability_slots.update({
      where: { id: slotId },
      data: { is_booked: false },
    });
  }

  async markAsBooked(slotId, tx) {
    return await tx.availability_slots.update({
      where: { id: slotId },
      data: { is_booked: true },
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

  async findById(slotId, tx) {
    return await tx.availability_slots.findUnique({
      where: { id: slotId },
    });
  }

  async createSlot(data) {
    return await prisma.availability_slots.create({ data });
  }

  async createBulkSlots(slots) {
    return await prisma.availability_slots.createMany({ data: slots });
  }

  async findOverlappingSlot(providerId, start, end) {
    return await prisma.availability_slots.findFirst({
      where: {
        provider_id: providerId,
        start_time: { lt: end },
        end_time: { gt: start },
      },
    });
  }

  
}

module.exports  = new slotRepository();
