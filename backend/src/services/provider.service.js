const providerRepo = require('../repositories/provider.repository.js');

class ProviderService{
    async createProvider(dto){
        const existing = await providerRepo.findProviderByUserId(dto.user_id);

        if(existing){
            throw new Error("User is already a provider");
        }

        const provider = await providerRepo.createProvider({
            user_id: dto.user_id,
            specialization: dto.specialization,
            experience_years: dto.experience_years,

        });

        await providerRepo.updataUserRoleToProvider(dto.user_id);

        return provider;
    }

}

module.exports = new ProviderService();