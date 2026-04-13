const validate = require("../../utils/validate");
const { updatePasswordSchema } = require("../../schemas/auth.schema");

class UpdatePasswordDTO {
  constructor(data) {
    this.currentPassword = data.currentPassword;
    this.newPassword = data.newPassword;
  }

  static validate(data) {
    const parsed = validate(updatePasswordSchema, data);
    return new UpdatePasswordDTO(parsed);
  }
}

module.exports = UpdatePasswordDTO;