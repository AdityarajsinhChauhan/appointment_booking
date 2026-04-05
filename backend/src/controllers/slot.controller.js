const slotService = require("../services/slot.service");

const CreateSlotDTO = require("../dto/request/createSlot.dto");
const SlotResponseDTO = require("../dto/response/slot.response.dto");
const createBulkSlots = require("../dto/request/createBulkSlots.dto");

class SlotController {
  async getSlotsByDate(req, res, next) {
    try {
      const { provider_id, date } = req.query;

      if (!provider_id) {
        return res.status(400).json({
          success: false,
          message: "provider_id is required",
        });
      }

      const slots = await slotService.getSlotsByDate(provider_id, date);

      return res.status(200).json({
        success: true,
        data: slots,
      });

    } catch (error) {
      next(error);
    }
  }

  async createSlot(req, res, next) {
    try {
      const dto = new CreateSlotDTO(req.body);

      const slot = await slotService.createSlot(req.user.id, dto);

      const response = new SlotResponseDTO(slot);

      res.status(201).json({
        success: true,
        message: "slot created successfully",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async createBulkSlots(req, res, next) {
    try {
      const dto = new createBulkSlots(req.body, req.user.id);
      const response = await slotService.createBulkSlots(dto, req.user.id);
      res.status(201).json({
        success: true,
        message: "slots created successfully",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new SlotController();
