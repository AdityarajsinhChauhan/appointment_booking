class UserAppointmentDTO{
    constructor(appointment){
        this.id = appointment.id;
        this.start_time = appointment.slot.start_time;
        this.end_time= appointment.slot.end_time;
        this.provider_id = appointment.providers.id;
        this.specialization = appointment.providers.specialization
        this.name = appointment.users.name;
    }
}