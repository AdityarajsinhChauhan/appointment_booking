const AppError = require("../../utils/appError");

class LoginDTO{
    constructor(data){
        this.email = data.email;
        this.password = data.password;
    }
    static validate(data){
        if(!data.email || !data.password){
            throw new AppError("Missing input fields",400);
        }
        return new LoginDTO(data);
    }
}

module.exports = LoginDTO;