import { fetchUserContentListApi } from "@/services/userContent";
import {
  FETCH_QUESTION_LIST_REQUEST,
  FETCH_QUESTION_LIST_SUCCESS,
  FETCH_QUESTION_LIST_FAILURE,
  FETCH_ANSWER_LIST_REQUEST,
  FETCH_ANSWER_LIST_SUCCESS,
  FETCH_ANSWER_LIST_FAILURE
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

export const fetchQuestionListThunkAction = ({ subCategoryId, param }, onSuccess = () => {}) => {
  return async (dispatch) => {
    try {
      dispatch(fetchQuestionListRequest());

      const promise = await fetchUserContentListApi({ subCategoryId, param });

      dispatch(fetchQuestionListSuccess(promise.data));

      onSuccess();
    } catch (error) {
      dispatch(fetchQuestionListFailure(error));
      toast.error(error.message);
    }
  };
};
