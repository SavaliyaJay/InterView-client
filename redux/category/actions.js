import {
  FETCH_CATEGORY_LIST_REQUEST,
  FETCH_CATEGORY_LIST_SUCCESS,
  FETCH_CATEGORY_LIST_FAILURE,
  RESET_CATEGORY_LIST_DATA,
  FETCH_CATEGORY_BY_ID_REQUEST,
  FETCH_CATEGORY_BY_ID_SUCCESS,
  FETCH_CATEGORY_BY_ID_FAILURE
} from "./types";

import { fetchCategoryListApi, postCategoryApi } from "@/services/categories";

import { toast } from "react-hot-toast";

export const fetchCategoryListRequest = () => {
  return {
    type: FETCH_CATEGORY_LIST_REQUEST
  };
};

export const fetchCategoryListSuccess = (CategoryList) => {
  return {
    type: FETCH_CATEGORY_LIST_SUCCESS,
    payload: { CategoryList }
  };
};

export const fetchCategoryListFailure = (error) => {
  return {
    type: FETCH_CATEGORY_LIST_FAILURE,
    payload: error
  };
};

export const resetCategoryList = () => {
  return {
    type: RESET_CATEGORY_LIST_DATA
  };
};

export const fetchCategoryByIdRequest = () => {
  return {
    type: FETCH_CATEGORY_BY_ID_REQUEST
  };
};

export const fetchCategoryByIdSuccess = (Category) => {
  return {
    type: FETCH_CATEGORY_BY_ID_SUCCESS,
    payload: Category
  };
};

export const fetchCategoryByIdFailure = (error) => {
  return {
    type: FETCH_CATEGORY_BY_ID_FAILURE,
    payload: error
  };
};

export const fetchCategoryListThunkAction = (onSuccess = () => {}, onError = () => {}) => {
  return async (dispatch) => {
    try {
      dispatch(fetchCategoryListRequest());
      const promise = fetchCategoryListApi();
      const { data } = await promise;
      dispatch(fetchCategoryListSuccess(data?.categories));
      onSuccess();
    } catch (error) {
      console.log(error);
      dispatch(fetchCategoryListFailure(error.message));
      onError(error.response?.data?.message || error.message);
    }
  };
};

export const addNewCategoryThunkAction = (reqBody, onSuccess = () => {}) => {
  return async (dispatch) => {
    try {
      const { data } = await postCategoryApi(reqBody);
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
