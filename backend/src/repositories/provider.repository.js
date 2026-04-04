const { prisma } = require("../config/db.config");

class ProviderRepository {
  async createProvider(data) {
    return await prisma.providers.create({ data });
  }

  async findUserByEmail(email) {
    return await prisma.users.findUnique({
      where: { email: email },
    });
  }

  async findProviderByUserId(userId) {
    return await prisma.providers.findUnique({
      where: { user_id: userId },
    });
  }

  async updateUserRoleToProvider(userId) {
    return await prisma.users.update({
      where: { id: userId },
      data: { role: "PROVIDER" },
    });
  }

  async createSlot(data) {
    return await prisma.availability_slots.create({ data });
  }

  async createBulkSlots(slots){
    return await prisma.availability_slots.createMany( { data: slots 

      
    })

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

module.exports = new ProviderRepository();
