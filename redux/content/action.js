import {
  getAnswerOfQuestionByIdApi,
  getSuggestionApi,
  fetchContentListApi,
  postAnswerApi,
  putAnswerOfQuestionApi,
  postQuestionApi
} from "@/services/content";
import {
  FETCH_QUESTION_LIST_REQUEST,
  FETCH_QUESTION_LIST_SUCCESS,
  FETCH_QUESTION_LIST_FAILURE,
  FETCH_ANSWER_LIST_REQUEST,
  FETCH_ANSWER_LIST_SUCCESS,
  FETCH_ANSWER_LIST_FAILURE,
  FETCH_SUGGESTION_FAILURE,
  FETCH_SUGGESTION_REQUEST,
  FETCH_SUGGESTION_SUCCESS
} from "./types";

import { toast } from "react-hot-toast";

export const fetchQuestionListRequest = () => {
  return {
    type: FETCH_QUESTION_LIST_REQUEST
  };
};

export const fetchQuestionListSuccess = (questions) => {
  return {
    type: FETCH_QUESTION_LIST_SUCCESS,
    payload: questions
  };
};

export const fetchQuestionListFailure = (error) => {
  return {
    type: FETCH_QUESTION_LIST_FAILURE,
    payload: error
  };
};

export const fetchAnswerListRequest = () => {
  return {
    type: FETCH_ANSWER_LIST_REQUEST
  };
};

export const fetchAnswerListSuccess = (answers) => {
  return {
    type: FETCH_ANSWER_LIST_SUCCESS,
    payload: answers
  };
};

export const fetchAnswerListFailure = (error) => {
  return {
    type: FETCH_ANSWER_LIST_FAILURE,
    payload: error
  };
};

export const fetchSuggestionRequest = () => {
  return {
    type: FETCH_SUGGESTION_REQUEST
  };
};

export const fetchSuggestionSuccess = (suggestion) => {
  return {
    type: FETCH_SUGGESTION_SUCCESS,
    payload: suggestion
  };
};

export const fetchSuggestionFailure = (error) => {
  return {
    type: FETCH_SUGGESTION_FAILURE,
    payload: error
  };
};

export const fetchQuestionListThunkAction = ({ subCategoryId, param }, onSuccess = () => {}) => {
  return async (dispatch) => {
    try {
      dispatch(fetchQuestionListRequest());

      const promise = await fetchContentListApi({ subCategoryId, param });

      dispatch(fetchQuestionListSuccess(promise.data));

      onSuccess();
    } catch (error) {
      dispatch(fetchQuestionListFailure(error));
      toast.error(error.response.data.message);
    }
  };
};

export const addQuestionThunkAction = (reqbody, onSuccess = () => {}) => {
  return async (dispatch) => {
    try {
      const { data } = await postQuestionApi(reqbody);

      if (data.success === false) {
        throw new Error(data.message);
      }

      toast.success(data.message);

      onSuccess();
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
};

export const postAnswerThunkAction = (answer, onSuccess = () => {}) => {
  return async (dispatch) => {
    try {
      const promise = await postAnswerApi(answer);

      if (promise.data.status === "error") {
        toast.error(promise.data.message);
        return;
      }

      toast.success(promise.data.message);

      onSuccess();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const fetchAnswerOfQuestionThunkAction = (questionId, onSuccess = () => {}) => {
  return async (dispatch) => {
    try {
      dispatch(fetchAnswerListRequest());

      const response = await getAnswerOfQuestionByIdApi(questionId);

      dispatch(fetchAnswerListSuccess(response.data));

      onSuccess();
    } catch (error) {
      dispatch(fetchAnswerListFailure(error));
      toast.error(error.response?.data?.message);
    }
  };
};

export const putAnswerOfQuestionThunkAction = (data, onSuccess = () => {}) => {
  return async (dispatch) => {
    try {
      const promise = await putAnswerOfQuestionApi(data);

      if (promise.data.status === "error") {
        toast.error(promise.data.message);
        return;
      }

      toast.success(promise.data.message);

      onSuccess();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const fetchSuggestionThunkAction = (data, onSuccess = () => {}) => {
  return async (dispatch) => {
    try {
      dispatch(fetchSuggestionRequest());

      const promise = await getSuggestionApi(data);

      dispatch(fetchSuggestionSuccess(promise.data));

      onSuccess();
    } catch (error) {
      dispatch(fetchSuggestionFailure(error));
      toast.error(error.response.data.message);
    }
  };
};
