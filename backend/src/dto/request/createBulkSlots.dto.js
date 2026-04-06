const validate = require("../../utils/validate");
const { bulkSlotSchema } = require("../../schemas/slot.schema");

class CreateBulkSlotDTO {
  constructor(data) {
    this.start_time = data.start_time;
    this.end_time = data.end_time;
    this.slot_duration = data.slot_duration;
  }

  static validate(data) {
    const parsed = validate(bulkSlotSchema, data);
    return new CreateBulkSlotDTO(parsed);
  }
}

module.exports = CreateBulkSlotDTO;