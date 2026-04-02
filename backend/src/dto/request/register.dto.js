class RegisterDTO{
    constructor (data){
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
    }

    static validate(data){
        if( !data.name || !data.email || !data.password){
            throw new Error("Missing input fields");
            
        }
        return new RegisterDTO(data);
    }
}
module.exports = RegisterDTO;