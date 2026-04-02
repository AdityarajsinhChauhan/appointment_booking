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

async updataUserRoleToProvider (userId){
    return await prisma.users.update({
        where: { id: userId },
        data: { role: "PROVIDER" }
    });
}

}



module.exports = new ProviderRepository();