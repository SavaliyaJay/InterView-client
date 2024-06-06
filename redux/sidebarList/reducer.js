import {
  FETCH_CATEGORY_LIST_REQUEST,
  FETCH_USER_CATEGORY_LIST_SUCCESS,
  FETCH_USER_CATEGORY_LIST_FAILURE,
  FETCH_SUBCATEGORY_LIST_REQUEST,
  FETCH_SUBCATEGORY_LIST_SUCCESS,
  FETCH_SUBCATEGORY_LIST_FAILURE
} from "./types";

const initialState = {
  categoryList: [],
  subCategoryList: [],
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_LIST_REQUEST:
    case FETCH_SUBCATEGORY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_USER_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        categoryList: action.payload,
        error: null
      };
    case FETCH_USER_CATEGORY_LIST_FAILURE:
    case FETCH_SUBCATEGORY_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case FETCH_SUBCATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        subCategoryList: action.payload,
        error: null
      };
    default:
      return state;
  }
};

export default reducer;
