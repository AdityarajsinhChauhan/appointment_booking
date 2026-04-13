const providerService = require("../services/provider.service");
const CreateProviderDTO = require("../dto/request/createProvider.dto");
const ProviderResponseDTO = require("../dto/response/provider.response.dto");
const GetSlotsBYProviderDTO = require('../dto/request/getSlotsByProvider.dto.');
const { success } = require("zod");

class ProviderController {
  async createProvider(req, res, next) {
    try {
      const dto = new CreateProviderDTO(req.body);

      const provider = await providerService.createProvider(dto);

      const response = new ProviderResponseDTO(provider);

      return res.status(201).json({
        success:true,
        message: "Provider created successfully",
        data:response,
      });
    } catch (err) {
      next(err);
    }
  }

  async getProvider(req, res, next) {
    try {
      const response = await providerService.getProviders();
      res.status(200).json({
        success:true,
        message: "Providers Fetched successfully",
        data:response,
      });
    } catch (err) {
      next(err);
    }
  }

  async getSlotsByProvider(req, res, next) {
  try {
    const userId = req.user.id; 

    const slots = await providerService.getSlotsByProvider(userId);

    return res.status(200).json({
      success: true,
      data: slots,
    });

  } catch (err) {
    next(err);
  }
}

async getProviderById(req, res, next){
  try {
    console.log(req.query)
    const { provider_id } = req.query;

    const result = await providerService.getProviderById(provider_id);

    res.status(200).json({
      success: true,
      message: "Provider details fetched successfully",
      data:result
    })
    
  } catch (err) {
    next(err);
    
  }
}
}

module.exports = new ProviderController();
