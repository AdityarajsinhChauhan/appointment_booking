import api from "./api";

export const loginUser = async(formData) => {
    console.log(formData)
    const res = await api.post('/auth/login', formData);
    return res.data;
}

export const registerUser = async(formData) => {
    const res = await api.post('/auth/register', formData);
    return res.data;
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

