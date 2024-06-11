import axiosInstance from "./axiosInstance";

export const fetchUserContentListApi = ({ subCategoryId, param }) =>
  axiosInstance.get(
    `/v1/question/subCategory/${subCategoryId}?page=${param.page}&limit=${param.limit}`
  );
