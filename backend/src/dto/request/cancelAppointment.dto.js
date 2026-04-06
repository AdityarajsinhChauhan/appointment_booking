const { cancelAppointmentSchema } = require("../../schemas/appointment.schema");
const validate = require("../../utils/validate");

class CancelAppointmentDTO {
  constructor(data) {
    this.appointmentId = data.appointmentId;
  }

  static validate(data) {
    const parsed = validate(cancelAppointmentSchema, data);
    return new CancelAppointmentDTO(parsed);
  }
}

module.exports = CancelAppointmentDTO;