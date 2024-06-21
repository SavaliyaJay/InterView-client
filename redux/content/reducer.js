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

const initialState = {
  answers: {},
  questions: {},
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
        questions: action.payload,
        error: ""
      };
    case FETCH_QUESTION_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        questions: {},
        error: action.payload
      };
    case FETCH_ANSWER_LIST_REQUEST:
      return {
        ...state,
        loading: true
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
