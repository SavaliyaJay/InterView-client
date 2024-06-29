import axiosInstance from "./axiosInstance";

export const getSubCategoryListApi = () => axiosInstance.get("/v1/subcategory");

export const getSubCategoryByIdApi = (categoryId) =>
  axiosInstance.get(`/v1/subcategory/category/${categoryId}`);

export const postSubCategoryApi = (reqBody) => axiosInstance.post("/v1/subcategory", reqBody);
