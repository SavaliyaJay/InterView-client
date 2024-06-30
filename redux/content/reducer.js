import {
  FETCH_QUESTION_LIST_REQUEST,
  FETCH_QUESTION_LIST_SUCCESS,
  FETCH_QUESTION_LIST_FAILURE,
  FETCH_QUESTION_LIST_BY_ID_REQUEST,
  FETCH_QUESTION_LIST_BY_ID_SUCCESS,
  FETCH_QUESTION_LIST_BY_ID_FAILURE,
  FETCH_ANSWER_LIST_REQUEST,
  FETCH_ANSWER_LIST_SUCCESS,
  FETCH_ANSWER_LIST_FAILURE,
  FETCH_SUGGESTION_FAILURE,
  FETCH_SUGGESTION_REQUEST,
  FETCH_SUGGESTION_SUCCESS
} from "./types";

const initialState = {
  questionList: [],
  questionByIdList: {},
  answers: {},
  suggestion: "",
  loading: false,
  error: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTION_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_QUESTION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        questionList: action.payload,
        error: ""
      };
    case FETCH_QUESTION_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        questionList: {},
        error: action.payload
      };
    case FETCH_ANSWER_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_QUESTION_LIST_BY_ID_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_QUESTION_LIST_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        questionByIdList: action.payload,
        error: ""
      };
    case FETCH_QUESTION_LIST_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        questionByIdList: {},
        error: action.payload
      };
    case FETCH_ANSWER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        answers: action.payload,
        error: ""
      };
    case FETCH_ANSWER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        answers: {},
        error: action.payload
      };
    case FETCH_SUGGESTION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUGGESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        suggestion: action.payload,
        error: ""
      };
    case FETCH_SUGGESTION_FAILURE:
      return {
        ...state,
        loading: false,
        suggestion: "",
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
