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

export const getProviders = async () => {
  const res = await api.get("/auth/");
  return res.data.filter(user => user.role === "PROVIDER");
};

export const getSlotsByProvider = async (providerId) => {
  const res = await api.get(`/appointment/${providerId}/slots`);
  return res.data.data;
};

export const createAppointment = async (slotId) => {
  const res = await api.post("/appointment", { slotId });
  return res.data;
};