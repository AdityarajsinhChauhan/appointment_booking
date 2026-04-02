const RegisterDTO = require("../dto/request/register.dto");
const LoginDTO = require("../dto/request/login.dto");
const AuthResponseDTO = require("../dto/response/auth.response.dto");
const authService = require("../services/auth.service");
const { response } = require("express");

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

      res.status(201).json(response);
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

      res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;

      const result = await authService.refreshToken(refreshToken);

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      await authService.logout(req.user.id);
      res.json({ message: "Logged out successfully" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
