const providerRepo = require("../repositories/provider.repository.js");
const AppError = require("../utils/appError.js");
const { convertToIST } = require('../utils/time.js');

class ProviderService {
  async createProvider(dto) {
    console.log(dto);
    const user = await providerRepo.findUserByEmail(dto.email);

    if(!user){
      throw new AppError("Invalid email",400);
    }

    console.log(user);

    const existing = await providerRepo.findProviderByUserId(user.id);

    if (existing) {
      throw new AppError("User is already a provider", 400);
    }

    const provider = await providerRepo.createProvider({
      user_id: user.id,
      specialization: dto.specialization,
      experience_years: dto.experience_years,
    });

    await providerRepo.updateUserRoleToProvider(user.id);

    return provider;
  }

  async getProviders() {
    return await providerRepo.getProviders();
  }
  
  async getSlotsByProvider(userId) {
  const provider = await providerRepo.findProviderByUserId(userId);

  if (!provider) {
    throw new AppError("Provider not found", 404);
  }

  const slots = await providerRepo.getSlotsByProviderId(provider.id);
  const updatedSlots = slots.map((slot) => ({
    ...slot,
    start_time: convertToIST(slot.start_time),
    end_time: convertToIST(slot.end_time),
  }));

  return updatedSlots;
}
}

module.exports = new ProviderService();
