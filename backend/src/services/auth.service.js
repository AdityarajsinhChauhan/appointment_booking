const {
  hashPassword,
  comparePassword,
} = require("../utils/bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const UserRepo = require("../repositories/user.repository");
const AppError = require("../utils/appError");

class AuthService {
  async register(dto) {
    const existingUser = await UserRepo.findByEmail(dto.email);
    if (existingUser) {
      throw new AppError("User already exists",409);
    }

    const hashedPassword = await hashPassword(dto.password);

    const user = await UserRepo.createUser({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await UserRepo.updateRefreshToken( user.id, refreshToken );

    return { user, refreshToken, accessToken };
  }

  async login(dto){
    const user = await UserRepo.findByEmail(dto.email);
    if(!user){
        throw new AppError("Invalid credentials",401);
    }

    const isMatch = await comparePassword(dto.password, user.password)
    if(!isMatch){
        throw new AppError("Invalid credentials",401);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await UserRepo.updateRefreshToken( user.id, refreshToken );

    return { user, accessToken, refreshToken};



    
  }

  async refreshToken(token){
    const user = await UserRepo.findByRefreshToken( token );
    if(!user){
        throw new AppError("Invalid refresh token",401);
    }
    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await UserRepo.updateRefreshToken( user.id, newRefreshToken );

    return { accessToken, refreshToken: newRefreshToken};
  }

  async logout(userId){
    return UserRepo.updateRefreshToken( userId, null );
  }
}

module.exports = new AuthService();
