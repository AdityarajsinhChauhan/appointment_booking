class CreateSlotDTO{
    constructor (data){
        this.start_time = data.start_time;
        this.end_time = data.end_time;
        this.slot_duration = data.slot_duration
    }
}

module.exports = CreateSlotDTO;