import api from "./api";

export const getAppointments = async (role) => {
    let url = "";

    if(role == "ADMIN"){
        url = "/appointment/"
    }
    else if(role == 'PROVIDER'){
        url = "/appointment/provider"
    }
    else{
        url = "/appointment/my"
    }

    

    const  res = await api.get(url);
    return res.data.data;
}





export const createAppointment = async (slotId) => {
  const res = await api.post("/appointment", { slotId });
  return res.data.data;
};

export const getProviders = async () => {
  const res = await api.get("/provider"); 
  return res.data.data;
};

export const cancelAppointment = async (appointmentId) => {
  const res = await api.patch(`/appointment/${appointmentId}/cancel`);
  return res.data;
};

export const reScheduleAppointment = async(appointmentId,newSlotId) => {
  const res = await api.patch('appointment/reschedule',{ appointmentId :appointmentId, newSlotId:newSlotId});
  return res.data
}

export const getProviderById = async(providerId) => {
  const res = await api.get(`provider/getProviderById?provider_id=${providerId}`);
  return res.data;
}