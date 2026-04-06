import api from "./api";

export const getUsers = async () => {
  const res = await api.get("/auth/");
  return res.data.data; // important: return only data
};