class CreateProviderDTO{
    constructor(data){
        this.user_id = data.user_id;
        this.specialization = data.specialization;
        this.experience_years = data.experience_years;
    }
}

module.exports = CreateProviderDTO;