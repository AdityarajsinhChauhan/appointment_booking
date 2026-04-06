const providerRepo = require("../repositories/provider.repository.js");
const AppError = require("../utils/appError.js");

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
}

module.exports = new ProviderService();
