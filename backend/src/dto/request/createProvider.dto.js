const { createProviderSchema } = require("../../schemas/provider.schema");
const validate = require("../../utils/validate");

class CreateProviderDTO {
  constructor(data) {
    this.email = data.email;
    this.specialization = data.specialization;
    this.experience_years = data.experience_years;
  }

  static validate(data) {
    const parsed = validate(createProviderSchema, data);
    return new CreateProviderDTO(parsed);
  }
}

module.exports = CreateProviderDTO;