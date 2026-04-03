import axios from "axios";
import { SERVER_API } from "../constants/constant";

export const axiosInstance = axios.create({
  baseURL: SERVER_API,
  withCredentials: true,
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: attach token if stored
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);


