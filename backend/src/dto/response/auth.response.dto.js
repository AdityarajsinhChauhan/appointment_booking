class AuthResponseDTO{
    constructor( user, access_token, refresh_token ){
        this.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        
    }
}

module.exports = AuthResponseDTO;