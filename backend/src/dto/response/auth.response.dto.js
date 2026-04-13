class AuthResponseDTO{
    constructor( user, access_token, refresh_token ){
        this.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            img_url:user.img_url,
            contact:user.contact,
            img_url:user.img_url
        };
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        
    }
}

module.exports = AuthResponseDTO;