const { prisma } = require("../config/db.config");

class UserRepository {
  async createUser(data) {
    return prisma.users.create({ data });
  }

  async findByEmail(email) {
    return prisma.users.findUnique({
      where: { email },
    });
  }

  async findById(id) {
    return prisma.users.findUnique({
      where: { id },
    });
  }

  async updateRefreshToken(user_id, token) {

    return prisma.users.update({
      where: { id: user_id },
      data: { refresh_token: token },
    });
  }

  async findByRefreshToken(token) {
    return prisma.users.findFirst({
      where: { refresh_token: token },
    });
  }

 

  async getAllUsers() {
    return prisma.users.findMany({
      include: { providers: true },
    });
  }

  async checkDatabase() {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return true;
      
    } catch (error) {
      return false;
      
    }
  }

  async updateProfile(userId,data){
    return await prisma.users.update({
      where: { id: userId },
      data: data
    })
  }

  async updatePassword(userId,newPassword){
    return await prisma.users.update({
      where: { id: userId},
      data: {password: newPassword}
    })
  }
}

module.exports = new UserRepository();
