const providerRepo = require('../repositories/provider.repository.js');
const AppError = require('../utils/appError.js');

class ProviderService{
    async createProvider(dto){
        const existing = await providerRepo.findProviderByUserId(dto.user_id);

        if(existing){
            throw new AppErrorError("User is already a provider",400);
        }

        const provider = await providerRepo.createProvider({
            user_id: dto.user_id,
            specialization: dto.specialization,
            experience_years: dto.experience_years,

        });

        await providerRepo.updateUserRoleToProvider(dto.user_id);

        return provider;
    }

    async createSlot( userId, dto ){
        const provider = await providerRepo.findProviderByUserId(userId);

        if(!provider){
            throw new AppError("Provider not found",404);
        }

        const start = new Date(dto.start_time);
        const end = new Date(dto.end_time);

        const now = new Date();

        if (start <= now) {
        throw new AppError("Cannot create slot in the past", 400);
    }

        if(start >= end){
            throw new AppError("Start time must be before then end time",400);
        }

        const overlapping = await providerRepo.findOverlappingSlot( provider.id, start, end );

        if(overlapping){
            throw new AppError("Slot overlaps with existing slot",400);
        }

        const slot = await providerRepo.createSlot({
            provider_id: provider.id,
            start_time: start,
            end_time: end,

        });
        return slot;
    }

}

module.exports = new ProviderService();