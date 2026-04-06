import axios from "axios";
import toast from "react-hot-toast";
import { refreshTokenApi } from "./auth.service";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

//state
let isRefreshing = false;
let failedQueue = [];

// queue handler
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// response interceptor
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message || "Something went wrong";

    // If not 401 → normal error
    if (status !== 401 || originalRequest._retry) {
      toast.error(message);
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = localStorage.getItem("refresh_token");

    // No refresh token → logout
    if (!refreshToken) {
      logout();
      return Promise.reject(error);
    }

    try {
      // If already refreshing → queue requests
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      isRefreshing = true;

     //callrefresh api
      const res = await refreshTokenApi(refreshToken);

      const newAccessToken = res.data.accessToken;
      const newRefreshToken = res.data.refreshToken;

      // Save new tokens
      localStorage.setItem("access_token", newAccessToken);
      localStorage.setItem("refresh_token", newRefreshToken);

      api.defaults.headers.common.Authorization =
        `Bearer ${newAccessToken}`;

      processQueue(null, newAccessToken);

      // retry original request
      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      logout();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

//logout
const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");

  toast.error("Session expired. Please login again");

  window.location.replace("/login");
};

export default api;