import {
  FETCH_CATEGORY_LIST_REQUEST,
  FETCH_CATEGORY_LIST_SUCCESS,
  FETCH_CATEGORY_LIST_FAILURE,
  RESET_CATEGORY_LIST_DATA,
  FETCH_CATEGORY_BY_ID_REQUEST,
  FETCH_CATEGORY_BY_ID_SUCCESS,
  FETCH_CATEGORY_BY_ID_FAILURE
} from "./types";

const initialState = {
  isLoading: false,
  error: null,
  CategoryList: [],
  Category: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        CategoryList: action.payload.CategoryList,
        error: ""
      };
    case FETCH_CATEGORY_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        CategoryList: [],
        error: action.payload
      };
    case RESET_CATEGORY_LIST_DATA:
      return {
        ...state,
        CategoryList: []
      };
    case FETCH_CATEGORY_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_CATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        Category: action.payload,
        error: ""
      };
    case FETCH_CATEGORY_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        Category: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
