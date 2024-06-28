import {
  FETCH_SUB_CATEGORY_LIST_REQUEST,
  FETCH_SUB_CATEGORY_LIST_SUCCESS,
  FETCH_SUB_CATEGORY_LIST_FAILURE,
  RESET_SUB_CATEGORY_LIST_DATA,
  FETCH_SUB_CATEGORY_BY_ID_REQUEST,
  FETCH_SUB_CATEGORY_BY_ID_SUCCESS,
  FETCH_SUB_CATEGORY_BY_ID_FAILURE
} from "./types";

import { toast } from "react-hot-toast";
import { fetchSubCategoryListApi, postSubCategoryApi } from "@/services/categories";

export const fetchSubCategoryListRequest = () => {
  return {
    type: FETCH_SUB_CATEGORY_LIST_REQUEST
  };
};

export const fetchSubCategoryListSuccess = (SubCategoryList) => {
  return {
    type: FETCH_SUB_CATEGORY_LIST_SUCCESS,
    payload: { SubCategoryList }
  };
};

export const fetchSubCategoryListFailure = (error) => {
  return {
    type: FETCH_SUB_CATEGORY_LIST_FAILURE,
    payload: error
  };
};

export const resetSubCategoryList = () => {
  return {
    type: RESET_SUB_CATEGORY_LIST_DATA
  };
};

export const fetchSubCategoryByIdRequest = () => {
  return {
    type: FETCH_SUB_CATEGORY_BY_ID_REQUEST
  };
};

export const fetchSubCategoryByIdSuccess = (SubCategory) => {
  return {
    type: FETCH_SUB_CATEGORY_BY_ID_SUCCESS,
    payload: { SubCategory }
  };
};

export const fetchSubCategoryByIdFailure = (error) => {
  return {
    type: FETCH_SUB_CATEGORY_BY_ID_FAILURE,
    payload: error
  };
};

export const fetchSubCategoryListThunkAction = (
  categoryId,
  onSuccess = () => {},
  onError = () => {}
) => {
  // console.log("fetchSubCategoryListThunkAction");
  return async (dispatch) => {
    try {
      dispatch(fetchSubCategoryListRequest());

      const promise = fetchSubCategoryListApi(categoryId);

      const { data } = await promise;

      console.log("fetchSubCategoryListThunkAction", data?.subCategories);
      dispatch(fetchSubCategoryListSuccess(data?.subCategories));
      onSuccess();
    } catch (error) {
      dispatch(fetchSubCategoryListFailure(error));
      onError();
    }
  };
};

export const addNewSubCategoryThunkAction = (reqBody, onSuccess = () => {}) => {
  console.log("reqBody", reqBody);
  return async (dispatch) => {
    try {
      const { data } = await postSubCategoryApi(reqBody);

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
