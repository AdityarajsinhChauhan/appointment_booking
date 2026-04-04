import api from "./api";

export const createProvider = async(data) => {
    const res = await api.post('/provider/create', data);
    return res;
}