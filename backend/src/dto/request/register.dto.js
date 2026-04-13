const { registerSchema } = require("../../schemas/auth.schema");
const validate = require("../../utils/validate");

class RegisterDTO {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.contact = data.contact;
    this.img_url = data.img_url
  }

  static validate(data) {
    const parsed = validate(registerSchema, data);
    return new RegisterDTO(parsed);
  }
}

module.exports = RegisterDTO;