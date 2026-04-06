import api from "./api";
import toast from "react-hot-toast";

export const createProvider = async(data) => {const res = await api.post('/provider/create', data);
    return res;
    }
