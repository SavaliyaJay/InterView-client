import {
  FETCH_CATEGORY_LIST_REQUEST,
  FETCH_USER_CATEGORY_LIST_SUCCESS,
  FETCH_USER_CATEGORY_LIST_FAILURE,
  FETCH_SUBCATEGORY_LIST_REQUEST,
  FETCH_SUBCATEGORY_LIST_SUCCESS,
  FETCH_SUBCATEGORY_LIST_FAILURE
} from "./types";

import { fetchSubCategoryListApi, fetchUserCategoryListApi } from "@/services/userCategories";

export const fetchCategoryListRequest = () => {
  return {
    type: FETCH_CATEGORY_LIST_REQUEST
  };
};

export const fetchUserCategoryListSuccess = (data) => {
  return {
    type: FETCH_USER_CATEGORY_LIST_SUCCESS,
    payload: data
  };
};

export const fetchUserCategoryListFailure = (error) => {
  return {
    type: FETCH_USER_CATEGORY_LIST_FAILURE,
    payload: error
  };
};

export const fetchSubCategoryListRequest = () => {
  return {
    type: FETCH_SUBCATEGORY_LIST_REQUEST
  };
};

export const fetchSubCategoryListSuccess = (data) => {
  return {
    type: FETCH_SUBCATEGORY_LIST_SUCCESS,
    payload: data
  };
};

export const fetchSubCategoryListFailure = (error) => {
  return {
    type: FETCH_SUBCATEGORY_LIST_FAILURE,
    payload: error
  };
};

export const fetchUserCategoryListThunkAction = (onSuccess = () => {}) => {
  return async (dispatch) => {
    try {
      dispatch(fetchCategoryListRequest());

      const promise = fetchUserCategoryListApi();

      const { data } = await promise;

      dispatch(fetchUserCategoryListSuccess(data?.categories));
      onSuccess();
    } catch (error) {
      dispatch(fetchUserCategoryListFailure(error));
    }
  };
};

export const fetchUserSubCategoryListThunkAction = (categoryId, onSuccess = () => {}) => {
  return async (dispatch) => {
    try {
      dispatch(fetchSubCategoryListRequest());

      const promise = fetchSubCategoryListApi(categoryId);

      const { data } = await promise;

      dispatch(fetchSubCategoryListSuccess(data?.subCategories));
      onSuccess();
    } catch (error) {
      dispatch(fetchSubCategoryListFailure(error));
    }
  };
};
