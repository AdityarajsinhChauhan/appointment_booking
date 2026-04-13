const RegisterDTO = require("../dto/request/register.dto");
const LoginDTO = require("../dto/request/login.dto");
const AuthResponseDTO = require("../dto/response/auth.response.dto");
const authService = require("../services/auth.service");
const UpdateUserDTO = require("../dto/request/updateUser.dto");
const UpdatePasswordDTO = require("../dto/request/updatePassword.dto");
const { success } = require("zod");

class AuthController {
  async register(req, res, next) {
    try {
      const dto = RegisterDTO.validate(req.body);

      const result = await authService.register(dto);

      const response = new AuthResponseDTO(
        result.user,
        result.accessToken,
        result.refreshToken,
      );

      res.status(201).json({
        success:true,
        message: "Registration successful",
        data: response,
      }
      );
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const dto = LoginDTO.validate(req.body);

      const result = await authService.login(dto);

      const response = new AuthResponseDTO(
        result.user,
        result.accessToken,
        result.refreshToken,
      );

      res.json({
        success:true,
        message: "Logged In successfully",
        data:response,
      });
      
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;

      const result = await authService.refreshToken(refreshToken);

      res.json({
        success:true,
        message: "Refresh successful",
        data:result,
      });
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      await authService.logout(req.user.id);
      res.json({ 
        success:true,
        message: "Logged out",
       });
    } catch (err) {
      next(err);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await authService.getAllUsers();
      res.json({
        success:true,
        message: "Fetched all users",
        data:users,
      });
    } catch (err) {
      next(err);
    }
  }

  async getHealth(req, res, next){
    try {
      const status = await authService.getHealthStatus();
      res.json(status);
      
    } catch (err) {
      res.status(500).json({
        api: "offline",
        database: "unknown" 
      })
      
    }
  }

  async updateUser(req, res, next){
    try {
      const dto = new UpdateUserDTO(req.body);

      console.log(dto);

      const result = await authService.updateProfile(req.user.id,dto);
       res.status(200).json({
        success:true,
        message: "user details updated"
       })

      
    } catch (err) {
      next(err);
      
    }
  }

  async updatePassword(req, res, next){
    try {
      const dto = new UpdatePasswordDTO(req.body);
      const result = await authService.updatePassword(req.user.id,dto) ;
      return res.status(200).json({
        success:true,
        message: "Password updated successfully",
        data:result
      })
      
    } catch (err) {
      next(err);
      
    }
  }
}

module.exports = new AuthController();
