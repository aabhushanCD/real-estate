import { axiosInstance } from "../../api/axiosInstance";

export const login = async (data) => {
  return await axiosInstance.post("/auth/login", data);
};

export const signup = async (data) => {
  return await axiosInstance.post("/auth/signup", data);
};

export const logout = async () => {
  return await axiosInstance.post("/auth/logout");
};

export const authMe = async () => {
  return await axiosInstance.get("/auth/me");
};
