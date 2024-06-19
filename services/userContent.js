import axiosInstance from "./axiosInstance";

export const fetchUserContentListApi = ({ subCategoryId, param }) =>
  axiosInstance.get(
    `/v1/question/subCategory/${subCategoryId}?page=${param.page}&limit=${param.limit}`
  );

export const postAnswerApi = (data) => axiosInstance.post("/v1/answer/", data);

export const fetchAnswerOfQuestionApi = (question_id) => {
  console.log(`/v1/answer/question/${question_id}`);
  return axiosInstance.get(`/v1/answer/question/${question_id}`);
};

export const putAnswerOfQuestionApi = (data) =>
  axiosInstance.put(`/v1/answer/${data.answer_id}`, data);

export const fetchSuggestionApi = () => axiosInstance.get("/v1/suggestion");
