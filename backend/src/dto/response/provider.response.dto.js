class ProviderResponseDTO{
    constructor(provider){
        this.id = provider.id;
        this.user_id = provider.user_id;
        this.specialization = provider.specialization;
        this.experience_years = provider.experience_years;
        this.created_at = provider.created_at;
    }
}

module.exports = ProviderResponseDTO;