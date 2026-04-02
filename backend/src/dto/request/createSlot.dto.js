class CreateSlotDTO{
    constructor (data){
        this.start_time = data.start_time;
        this.end_time = data.end_time;
    }
}

module.exports = CreateSlotDTO;