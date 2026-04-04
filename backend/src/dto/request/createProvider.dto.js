class CreateProviderDTO{
    constructor(data){
        this.email = data.email;
        this.specialization = data.specialization;
        this.experience_years = data.experience;
    }
}

module.exports = CreateProviderDTO;