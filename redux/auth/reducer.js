import {
  SET_LOGGED_IN_USER,
  SET_LOGGED_OUT_USER,
  REFRESH_STATE,
  SET_IS_SIGNUP,
  RESET_IS_SIGNUP,
  SET_IS_SUBMITING,
  RESET_IS_SUBMITING
} from "./types";

const initialState = {
  loggedInUser: null,
  token: null,
  role: "",
  isLoading: false,
  error: "",
  isSigning: false,
  isSubmiting: false,
  isVerified: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN_USER:
      return {
        ...state,
        loggedInUser: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
        isVerified: action.payload.isVerified,
        isLoading: false,
        error: ""
      };
    case SET_LOGGED_OUT_USER:
      return {
        ...state,
        loggedInUser: null,
        token: null,
        role: "",
        isVerified: false,
        isLoading: false,
        error: ""
      };
    case REFRESH_STATE:
      return {
        ...state,
        isLoading: false,
        error: ""
      };
    case SET_IS_SIGNUP:
      return {
        ...state,
        isSigning: true
      };
    case RESET_IS_SIGNUP:
      return {
        ...state,
        isSigning: false
      };
    case SET_IS_SUBMITING:
      return {
        ...state,
        isSubmiting: true
      };
    case RESET_IS_SUBMITING:
      return {
        ...state,
        isSubmiting: false
      };
    default:
      return state;
  }
};

export default authReducer;
