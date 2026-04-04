const providerRepo = require("../repositories/provider.repository.js");
const AppError = require("../utils/appError.js");

class ProviderService {
  async createProvider(dto) {
    console.log(dto)
    const user = await providerRepo.findUserByEmail(dto.email);

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

  async createSlot(userId, dto) {
    const provider = await providerRepo.findProviderByUserId(userId);

    if (!provider) {
      throw new AppError("Provider not found", 404);
    }

    const start = new Date(dto.start_time);
    const end = new Date(dto.end_time);

    const now = new Date();

    if (start <= now) {
      throw new AppError("Cannot create slot in the past", 400);
    }

    if (start >= end) {
      throw new AppError("Start time must be before then end time", 400);
    }

    const overlapping = await providerRepo.findOverlappingSlot(
      provider.id,
      start,
      end,
    );

    if (overlapping) {
      throw new AppError("Slot overlaps with existing slot", 400);
    }

    const slot = await providerRepo.createSlot({
      provider_id: provider.id,
      start_time: start,
      end_time: end,
    });
    return slot;
  }

  async createBulkSlots (data,userId){
    const provider = await providerRepo.findProviderByUserId(userId);

    if(!provider){
      throw new AppError("Provider not found",404);
    }

      const { start_time , end_time, slot_duration} = data;

      if(slot_duration % 5 != 0){
        throw new AppError("Invalid slot duration",400);
      }

      const slots = [];

      const durationMs = slot_duration*60000

      let current = new Date(start_time);

      while(current.getTime() + durationMs <= new Date(end_time)){
        const next = new Date( current.getTime() + durationMs);

        slots.push({
          provider_id: provider.id,
          start_time: new Date(current),
          end_time: new Date(next)
        });

        current = next;
      }

      return await providerRepo.createBulkSlots(slots);
  }
}

module.exports = new ProviderService();
