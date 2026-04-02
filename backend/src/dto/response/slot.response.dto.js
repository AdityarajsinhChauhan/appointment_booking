class SlotResponseDTO {
  constructor(slot) {
    this.id = slot.id;
    this.provider_id = slot.provider_id;
    this.start_time = slot.start_time;
    this.end_time = slot.end_time;
    this.is_booked = slot.is_booked;
  }
}

module.exports = SlotResponseDTO;
