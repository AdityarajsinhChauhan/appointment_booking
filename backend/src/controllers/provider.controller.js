const providerService = require('../services/provider.service');
const CreateProviderDTO = require('../dto/request/createProvider.dto');
const ProviderResponseDTO = require('../dto/response/provider.response.dto');

class ProviderController{
    async createProvider( req, res, next ){
        try {
            const dto = new CreateProviderDTO(req.body);

            const provider = await providerService.createProvider(dto);

            const response = new ProviderResponseDTO(provider)

            return res.status(201).json({
                message:"Provider created successfully",
                data: response
            });
            
        } catch (err) {
            next(err);
            
        }
    }
}

module.exports = new ProviderController();