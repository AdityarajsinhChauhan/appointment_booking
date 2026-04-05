import api from "./api";

export const createSlot = async (payload) => {
  try {
    let response;

    if (payload.slot_duration) {
      // MULTI SLOT
      response = await api.post("/slot/create/bulk", payload);
    } else {
      // SINGLE SLOT
      response = await api.post("/slot/create", payload);
    }

    return response.data;
  } catch (err) {
    console.error("Create slot error:", error);
    throw err.response?.data || { message: "Something went wrong" };
  }
};

export const getSlotsByDate = async(providerId, date) => {
  try {
    const res = await api.get(`slot/bydate?provider_id=${providerId}&date=${date}`)
    return res;
    
  } catch (err) {
    console.error(err)
    
  }

}
