import axiosInstance from "./axiosInstance";

export const fetchUserCategoryListApi = () => axiosInstance.get("/v1/category");
export const fetchSubCategoryListApi = (categoryId) =>
  axiosInstance.get(`/v1/subcategory/category/${categoryId}`);
