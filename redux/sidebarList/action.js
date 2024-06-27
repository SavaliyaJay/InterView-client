import {
  FETCH_CATEGORY_LIST_REQUEST,
  FETCH_CATEGORY_LIST_SUCCESS,
  FETCH_CATEGORY_LIST_FAILURE,
  FETCH_SUBCATEGORY_LIST_REQUEST,
  FETCH_SUBCATEGORY_LIST_SUCCESS,
  FETCH_SUBCATEGORY_LIST_FAILURE
} from "./types";

import {
  fetchSubCategoryListApi,
  fetchCategoryListApi,
  postCategoryApi,
  postSubCategoryApi
} from "@/services/categories";
import { toast } from "react-hot-toast";

export const fetchCategoryListRequest = () => {
  return {
    type: FETCH_CATEGORY_LIST_REQUEST
  };
};

export const fetchCategoryListSuccess = (data) => {
  return {
    type: FETCH_CATEGORY_LIST_SUCCESS,
    payload: data
  };
};

export const fetchCategoryListFailure = (error) => {
  return {
    type: FETCH_CATEGORY_LIST_FAILURE,
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

export const fetchCategoryListThunkAction = (onSuccess = () => {}) => {
  return async (dispatch) => {
    try {
      dispatch(fetchCategoryListRequest());

      const promise = fetchCategoryListApi();

      const { data } = await promise;

      dispatch(fetchCategoryListSuccess(data?.categories));
      onSuccess();
    } catch (error) {
      dispatch(fetchCategoryListFailure(error));
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

export const fetchSubCategoryListThunkAction = (categoryId, onSuccess = () => {}) => {
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
