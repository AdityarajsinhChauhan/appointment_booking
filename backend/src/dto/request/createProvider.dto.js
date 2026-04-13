const { createProviderSchema } = require("../../schemas/provider.schema");
const validate = require("../../utils/validate");

class CreateProviderDTO {
  constructor(data) {
    this.email = data.email;
    this.specialization = data.specialization;
    this.experience_years = data.experience_years;
    this.address = data.address;
    this.area = data.area;
    this.city = data.city;
    this.state = data.state;
    this.pincode = data.pincode;
  }

  static validate(data) {
    const parsed = validate(createProviderSchema, data);
    return new CreateProviderDTO(parsed);
  }
}

module.exports = CreateProviderDTO;