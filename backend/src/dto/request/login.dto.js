const { loginSchema } = require("../../schemas/auth.schema");
const validate = require("../../utils/validate");

class LoginDTO {
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
  }

  static validate(data) {
    const parsed = validate(loginSchema, data);
    return new LoginDTO(parsed);
  }
}

module.exports = LoginDTO;