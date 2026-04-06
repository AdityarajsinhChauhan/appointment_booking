const { createAppointmentSchema } = require("../../schemas/appointment.schema");
const validate = require("../../utils/validate");

class CreateAppointmentDTO {
  constructor(data) {
    this.slotId = data.slotId;
  }

  static validate(data) {
    const parsed = validate(createAppointmentSchema, data);
    return new CreateAppointmentDTO(parsed);
  }
}

module.exports = CreateAppointmentDTO;