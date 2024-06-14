import axiosInstance from "./axiosInstance";

export const fetchUserContentListApi = ({ subCategoryId, param }) =>
  axiosInstance.get(
    `/v1/question/subCategory/${subCategoryId}?page=${param.page}&limit=${param.limit}`
  );

export const postAnswerApi = (data) => axiosInstance.post("/v1/answer/", data);

export const fetchAnswerOfQuestionApi = (question_id) =>
  axiosInstance.get(`/v1/answer/question/${question_id}`);
