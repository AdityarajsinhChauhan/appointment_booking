const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const UserRepo = require("../repositories/user.repository");
const AppError = require("../utils/appError");
const userRepository = require("../repositories/user.repository");
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

class AuthService {
  async register(dto) {
    const existingUser = await UserRepo.findByEmail(dto.email);
    if (existingUser) {
      throw new AppError("User already exists", 409);
    }

    const hashedPassword = await hashPassword(dto.password);

    const user = await UserRepo.createUser({
      name: dto.name,
      email: dto.email,
      contact: dto.contact,
      img_url: dto.img_url,
      password: hashedPassword,

    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await UserRepo.updateRefreshToken(user.id, refreshToken);

    return { user, refreshToken, accessToken };
  }

  async login(dto) {
    const user = await UserRepo.findByEmail(dto.email);
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isMatch = await comparePassword(dto.password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

     await UserRepo.updateRefreshToken(user.id, refreshToken);

    return { user, accessToken, refreshToken };
  }

  async refreshToken(token) {
    const user = await UserRepo.findByRefreshToken(token);
    if (!user) {
      throw new AppError("Invalid refresh token", 401);
    }
    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await UserRepo.updateRefreshToken(user.id, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  }

  async logout(userId) {
    return UserRepo.updateRefreshToken(userId, null);
  }

  async getAllUsers() {
    return UserRepo.getAllUsers();
  }

  async getHealthStatus(){
    const dbStatus = await UserRepo.checkDatabase();

    return{
      api: "online",
      database: dbStatus ? "connected" : "disconnected",
      timestamp: new Date(),
    }
  }

  async updateProfile(userId,data){
    return await UserRepo.updateProfile(userId,data);
  }

  async updatePassword(userId,data){
    const user = await UserRepo.findById(userId);

    if(!user){
      throw new AppError("user not  found",404);
    }

    const isMatch = await bcrypt.compare(
      data.currentPassword,
      user.password
    );

    if(!isMatch){
      throw new AppError("Current Password is incorrect!",401)
    }


    const hashedPassword = await bcrypt.hash(data.newPassword,10);
    return await UserRepo.updatePassword(userId,hashedPassword);
    
  }
}

module.exports = new AuthService();
