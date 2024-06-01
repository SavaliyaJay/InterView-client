import {
  REFRESH_STATE,
  RESET_IS_SIGNING,
  SET_IS_SIGNING,
  SET_LOGGEDIN_USER,
  SET_LOGGEDOUT_USER,
  SET_FORGET_PASSWORD_USER_EMAIL,
  RESET_FORGET_PASSWORD_USER_EMAIL
} from "./types";

const initialState = {
  loggedInUser: null,
  token: null,
  role: "",
  isLoading: false,
  isSigning: false,
  error: "",
  isVerify: false,
  userprofileDetail: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGEDIN_USER:
      return {
        ...state,
        token: action.payload.token,
        loggedInUser: action.payload.user,
        role: action.payload.role,
        error: "",
        isSigning: false
      };
    case SET_LOGGEDOUT_USER:
      return {
        ...state,
        ...initialState
      };

    case SET_IS_SIGNING:
      return {
        ...state,
        isSigning: true
      };
    case RESET_IS_SIGNING:
      return {
        ...state,
        isSigning: false
      };
    case SET_FORGET_PASSWORD_USER_EMAIL:
      return {
        ...state,
        isVerify: true
      };
    case RESET_FORGET_PASSWORD_USER_EMAIL:
      return {
        ...state,
        isVerify: false
      };
    case REFRESH_STATE:
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
        loggedInUser: action.payload.user
      };
    default:
      return state;
  }
};

export default reducer;
