const { prisma } = require('../config/db.config');

class ProviderRepository{
    async createProvider(data){
    return await prisma.providers.create({ data });
}

async findProviderByUserId (userId){
    return await prisma.providers.findUnique({
        where: { user_id: userId }
    });
}

async updateUserRoleToProvider (userId){
    return await prisma.users.update({
        where: { id: userId },
        data: { role: "PROVIDER" }
    });
}

async createSlot(data){
    return await prisma.availability_slots.create({ data });
}

async findOverlappingSlot(providerId, start, end) {
    return await prisma.availability_slots.findFirst({
        where: {
            provider_id: providerId,
            start_time: { lte: end },
            end_time: { gte: start }
        }
    });
}

}



module.exports = new ProviderRepository();