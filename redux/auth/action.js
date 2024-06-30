import { postRegisterUserApi, postLoggedInUserApi } from "@/services/authServices";
import {
  REFRESH_STATE,
  RESET_IS_SIGNING,
  SET_IS_SIGNING,
  SET_LOGGEDIN_USER,
  SET_LOGGEDOUT_USER,
  SET_FORGET_PASSWORD_USER_EMAIL,
  RESET_FORGET_PASSWORD_USER_EMAIL
} from "./types";
import { toast } from "react-hot-toast";

export const setLoggedInUser = ({ user, token, role }) => {
  return {
    type: SET_LOGGEDIN_USER,
    payload: { user, token, role }
  };
};

export const setLoggedOutUser = () => {
  return {
    type: SET_LOGGEDOUT_USER
  };
};

export const setIsSigning = () => {
  return {
    type: SET_IS_SIGNING
  };
};
export const setForgetpasswordUserEmail = () => {
  return {
    type: SET_FORGET_PASSWORD_USER_EMAIL
  };
};
export const resetForgetpasswordUserEmail = () => {
  return {
    type: RESET_FORGET_PASSWORD_USER_EMAIL
  };
};

export const resetIsSigning = () => {
  return {
    type: RESET_IS_SIGNING
  };
};

export const refreshState = ({ token, user, role }) => ({
  type: REFRESH_STATE,
  payload: { token, user, role }
});

export const registerUserThunkAction = (user, onSuccess = () => {}) => {
  return async (dispatch) => {
    try {
      dispatch(setIsSigning());

      const promise = postRegisterUserApi(user);

      toast.promise(promise, {
        loading: "Loading...",
        success: "User registered successfully.",
        error: (error) => `${error?.response?.data?.message || error?.message}`
      });

      const { data } = await promise;

      if (data.success !== true) {
        throw new Error(data.message);
      }
      onSuccess();
      dispatch(resetIsSigning());
    } catch (error) {
      dispatch(resetIsSigning());
      console.log(error?.message || error?.response?.data?.message);
    }
  };
};

export const fetchLoginUserThunkAction = ({ email, password }, onSuccess) => {
  return async (dispatch) => {
    try {
      dispatch(setIsSigning());

      const { data } = await postLoggedInUserApi({ email, password });

      if (data.success !== true) {
        throw new Error(data.message);
      }

      toast.success("Logged in successfully.");

      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("role", data.data.role);
      localStorage.setItem("user", data.data.username);
      dispatch(
        setLoggedInUser({
          token: data.accessToken,
          role: data.data.role,
          user: data.data.username
        })
      );
      onSuccess();
      dispatch(resetIsSigning());
    } catch (error) {
      dispatch(resetIsSigning());
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
};
