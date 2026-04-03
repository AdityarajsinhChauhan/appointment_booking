class AppointmentResponseDTO {
  constructor(appointment) {
    this.id = appointment.id;
    this.userId = appointment.user_id;
    this.providerId = appointment.provider_id;
    this.status = appointment.status;

    this.slot = {
      startTime: appointment.slot.start_time,
      endTime: appointment.slot.end_time
    };
  }
}

module.exports = AppointmentResponseDTO;