const { prisma } = require('../config/db.config') ;

class UserRepository{
    async createUser(data){
        return prisma.users.create({ data });
    }

    async findByEmail(email){
        return prisma.users.findUnique({
            where: { email }
        });
    }

    async findById(id){
        return prisma.users.findUnique({
            where: { id }
        });
    }

    async updateRefreshToken( user_id, token ){
        return prisma.users.update({
            where: { id: user_id },
            data: { refresh_token: token }
        })

    }

    async findByRefreshToken(token){
        return prisma.users.findFirst({
            where: { refresh_token: token}
        });
    }

}

module.exports = new UserRepository();