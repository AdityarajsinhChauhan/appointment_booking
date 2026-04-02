const providerService = require('../services/provider.service');
const CreateProviderDTO = require('../dto/request/createProvider.dto');
const ProviderResponseDTO = require('../dto/response/provider.response.dto');
const CreateSlotDTO = require('../dto/request/createSlot.dto');
const SlotResponseDTO = require('../dto/response/slot.response.dto');


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

    async createSlot( req, res, next ){
        try {

            console.log(req.body);
            const dto = new CreateSlotDTO(req.body) ;

            const slot = await providerService.createSlot(req.user.id,dto);

            const response = new SlotResponseDTO(slot);

            res.status(201).json({
                success:true,
                message: "slot created successfully",
                data: response
            })
            
        } catch (err) {
            next(err);
            
        }
    }
}

module.exports = new ProviderController();