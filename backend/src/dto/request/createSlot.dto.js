const validate = require("../../utils/validate");
const { singleSlotSchema } = require("../../schemas/slot.schema.js")


class CreateSingleSlotDTO {
  constructor(data) {
    this.start_time = data.start_time;
    this.end_time = data.end_time;
  }

  static validate(data) {
    const parsed = validate(singleSlotSchema, data);
    return new CreateSingleSlotDTO(parsed);
  }
}

module.exports = CreateSingleSlotDTO;