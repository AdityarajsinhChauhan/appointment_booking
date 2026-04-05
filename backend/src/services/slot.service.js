const slotRepo = require('../repositories/slot.repository');
const providerRepo = require('../repositories/provider.repository');
const AppError = require("../utils/appError");
const { convertToIST} = require('../utils/time')

class SlotService{
    async getSlotsByDate(providerId, date) {
    const provider = await providerRepo.findProviderById(providerId);

    if (!provider) {
      throw new AppError("Provider not found", 404);
    }

    if (!date) {
      throw new AppError("Date is required", 400);
    }

    //Convert IST → UTC range
    const startIST = new Date(`${date}T00:00:00+05:30`);
    const nextDayIST = new Date(startIST);
    nextDayIST.setDate(nextDayIST.getDate() + 1);

    const startUTC = startIST;
    const endUTC = nextDayIST;

    const slots = await slotRepo.getSlotsByDate(
      provider.id,
      startUTC,
      endUTC
    );

    const formattedslots = slots.map((slot) => ({
    ...slot,
    start_time: convertToIST(slot.start_time),
    end_time: convertToIST(slot.end_time),
  }));


    return formattedslots;
  }

  async createSlot(userId, dto) {
    const provider = await providerRepo.findProviderByUserId(userId);

    if (!provider) {
      throw new AppError("Provider not found", 404);
    }

    const start = new Date(dto.start_time);
    const end = new Date(dto.end_time);

    const now = new Date();

    if (start <= now) {
      throw new AppError("Cannot create slot in the past", 400);
    }

    if (start >= end) {
      throw new AppError("Start time must be before then end time", 400);
    }

    const overlapping = await slotRepo.findOverlappingSlot(
      provider.id,
      start,
      end,
    );

    if (overlapping) {
      throw new AppError("Slot overlaps with existing slot", 400);
    }

    const slot = await slotRepo.createSlot({
      provider_id: provider.id,
      start_time: start,
      end_time: end,
    });
    return slot;
  }

  async createBulkSlots(data, userId) {
  const provider = await providerRepo.findProviderByUserId(userId);

  if (!provider) {
    throw new AppError("Provider not found", 404);
  }

  const { start_time, end_time, slot_duration } = data;

  // Convert to Date
  const start = new Date(start_time);
  const end = new Date(end_time);

  const now = new Date();

  // Basic validations (same as single)
  if (start <= now) {
    throw new AppError("Cannot create slots in the past", 400);
  }

  if (start >= end) {
    throw new AppError("Start time must be before end time", 400);
  }

  // Slot duration validation
  const duration = Number(slot_duration);

  if (!duration || duration <= 0) {
    throw new AppError("Invalid slot duration", 400);
  }

  if (duration % 5 !== 0) {
    throw new AppError("Slot duration must be multiple of 5", 400);
  }

  // Check if duration fits in range
  const totalTime = end.getTime() - start.getTime();

  if (totalTime < duration * 60000) {
    throw new AppError("Slot duration is larger than time range", 400);
  }

  //OVERLAP CHECK 
  const overlapping = await slotRepo.findOverlappingSlot(
    provider.id,
    start,
    end
  );

  if (overlapping) {
    throw new AppError("Slots overlap with existing slots", 400);
  }

  // Generate slots
  const slots = [];
  let current = new Date(start);

  while (current.getTime() + duration * 60000 <= end.getTime()) {
    const next = new Date(current.getTime() + duration * 60000);

    slots.push({
      provider_id: provider.id,
      start_time: new Date(current),
      end_time: new Date(next),
    });

    current = next;
  }

  //Safety check
  if (slots.length === 0) {
    throw new AppError("No valid slots generated", 400);
  }

  return await slotRepo.createBulkSlots(slots);
}


}

module.exports = new SlotService();