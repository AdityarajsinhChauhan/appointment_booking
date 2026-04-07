const validate = require("../../utils/validate");
const { getSlotsBNyProviderSchema } = require("../../schemas/provider.schema.js")


class GetSlotsBYProviderDTO {
  constructor(userId) {
    this.userId = userId;
  }

  static validate(userId) {
    const parsed = validate(getSlotsSchema, userId);
    return new GetSlotsBYProviderDTO(parsed);
  }
}

module.exports = GetSlotsBYProviderDTO;;