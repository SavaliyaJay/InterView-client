import {
  FETCH_SUB_CATEGORY_LIST_REQUEST,
  FETCH_SUB_CATEGORY_LIST_SUCCESS,
  FETCH_SUB_CATEGORY_LIST_FAILURE,
  RESET_SUB_CATEGORY_LIST_DATA,
  FETCH_SUB_CATEGORY_BY_ID_REQUEST,
  FETCH_SUB_CATEGORY_BY_ID_SUCCESS,
  FETCH_SUB_CATEGORY_BY_ID_FAILURE
} from "./types";

const initialState = {
  isLoading: false,
  error: "",
  SubCategoryList: [],
  SubCategory: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUB_CATEGORY_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_SUB_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        SubCategoryList: action.payload.SubCategoryList,
        error: ""
      };
    case FETCH_SUB_CATEGORY_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        SubCategoryList: [],
        error: action.payload
      };
    case RESET_SUB_CATEGORY_LIST_DATA:
      return {
        ...state,
        SubCategoryList: []
      };
    case FETCH_SUB_CATEGORY_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_SUB_CATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        SubCategory: action.payload,
        error: ""
      };
    case FETCH_SUB_CATEGORY_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        SubCategory: {},
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
