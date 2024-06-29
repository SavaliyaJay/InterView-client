import axiosInstance from "./axiosInstance";

export const getCategoryByIdApi = () => axiosInstance.get("/v1/category");

export const postCategoryApi = (reqBody) => axiosInstance.post("/v1/category", reqBody);
