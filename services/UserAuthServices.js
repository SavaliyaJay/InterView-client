import axiosInstance from "./axiosInstance";

export const postRegisterUserApi = (userData) => axiosInstance.post("/v1/auth/register", userData);

export const postLoggedInUserApi = (userData) => axiosInstance.post("/v1/auth/login", userData);
