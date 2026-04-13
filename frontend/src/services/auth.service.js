import api from "./api";

export const loginUser = async(formData) => {
    console.log(formData)
    const res = await api.post('/auth/login', formData);
    return res.data;
}

export const registerUser = async(formData) => {
  console.log("service:",formData);
    const res = await api.post('/auth/register', formData);
    return res.data;
}

export const updateUser = async(formData) => {
  const res = await api.patch('/auth/update',formData);
  return res;
}

export const updatePassword = async(formData) => {
  const res = await api.put('/auth/password',formData);
  return res;
}

export const logoutUser = async () => {
  return await api.post("/auth/logout");
};

export const refreshTokenApi = async (refreshToken) => {
  const res = await api.post("/auth/refresh", {
    refreshToken,
  });

  return res.data;
};

