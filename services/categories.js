import axiosInstance from "./axiosInstance";

export const fetchCategoryListApi = () => axiosInstance.get("/v1/category");
export const fetchSubCategoryListApi = (categoryId) =>
  axiosInstance.get(`/v1/subcategory/category/${categoryId}`);

export const postCategoryApi = (reqBody) => axiosInstance.post("/v1/category", reqBody);

export const postSubCategoryApi = (reqBody) => axiosInstance.post("/v1/subcategory", reqBody);
