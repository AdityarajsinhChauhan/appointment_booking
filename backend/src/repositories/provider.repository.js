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

  async findProviderById(providerId) {
    return await prisma.providers.findUnique({
      where: { id: providerId },
    });
  }

  async updateUserRoleToProvider(userId) {
    return await prisma.users.update({
      where: { id: userId },
      data: { role: "PROVIDER" },
    });
  }

  async getProviders() {
    return await prisma.providers.findMany({ include: { users: true } });
  }

  async getSlotsByProviderId(providerId){
    return await prisma.availability_slots.findMany({where: {provider_id:providerId}})
  }

  async getProviderById(providerId){
    return await prisma.providers.findUnique({
      where: {id: providerId},
      include: { users: true }
    });
  }
}

module.exports = new ProviderRepository();
