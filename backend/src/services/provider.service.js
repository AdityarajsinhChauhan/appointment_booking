const providerRepo = require("../repositories/provider.repository.js");
const AppError = require("../utils/appError.js");
const { convertToIST } = require("../utils/time.js");

class ProviderService {
  async createProvider(dto) {
    console.log(dto.email)
    const user = await providerRepo.findUserByEmail(dto.email);

    if (!user) {
      throw new AppError("Invalid email", 400);
    }

    const existing = await providerRepo.findProviderByUserId(user.id);

    if (existing) {
      throw new AppError("User is already a provider", 400);
    }

    const provider = await providerRepo.createProvider({
      user_id: user.id,
      specialization: dto.specialization,
      experience_years: dto.experience_years,
      address: dto.address,
      area: dto.area,
      city: dto.city,
      state: dto.state,
      pincode: dto.pincode,
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
      start_time: slot.start_time,
      end_time: slot.end_time,
    }));

    return updatedSlots;
  }

  async getProviderById(providerId){
    const result = await providerRepo.getProviderById(providerId);
    if(!result){
      throw new AppError("Provider details not found",404);
    }
    return result;
  }
}

module.exports = new ProviderService();
