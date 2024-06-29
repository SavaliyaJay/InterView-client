import axiosInstance from "./axiosInstance";

export const fetchContentListApi = ({ subCategoryId, param }) =>
  axiosInstance.get(
    `/v1/question/subCategory/${subCategoryId}?page=${param.page}&limit=${param.limit}`
  );

export const postQuestionApi = (data) => axiosInstance.post("/v1/question/", data);

export const postAnswerApi = (data) => axiosInstance.post("/v1/answer/", data);

export const getAnswerOfQuestionByIdApi = (question_id) => {
  return axiosInstance.get(`/v1/answer/question/${question_id}`);
};

export const putAnswerOfQuestionApi = (data) =>
  axiosInstance.put(`/v1/answer/${data.answer_id}`, data);

export const getSuggestionApi = (data) => axiosInstance.get("/v1/suggestion", { params: data });
