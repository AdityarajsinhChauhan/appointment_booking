const { rescheduleAppointmentSchema } = require("../../schemas/appointment.schema");
const validate = require("../../utils/validate");

class RescheduleDTO {
  constructor(data) {
    this.appointmentId = data.appointmentId;
    this.newSlotId = data.newSlotId;
  }

  static validate(data) {
    const parsed = validate(rescheduleAppointmentSchema, data);
    return new RescheduleDTO(parsed);
  }
}

module.exports = RescheduleDTO;