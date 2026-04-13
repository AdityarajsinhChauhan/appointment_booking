const { updateUserSchema } = require("../../schemas/auth.schema");
const validate = require("../../utils/validate");

class UpdateUserDTO{
    constructor(data){
        this.name = data.name;
        this.contact = data.contact;
        this.img_url = data.img_url;
    }

    static validate(data){
        const parsed = validate(UpdateUserDTO,data);
        return new UpdateUserDTO(parsed);
    }
}

module.exports = UpdateUserDTO;
