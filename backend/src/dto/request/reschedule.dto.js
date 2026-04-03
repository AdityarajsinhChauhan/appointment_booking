class RescheduleDTO {
  constructor(data) {
    this.appointmentId = data.appointmentId;
    this.newSlotId = data.newSlotId;
  }
}

module.exports = RescheduleDTO;