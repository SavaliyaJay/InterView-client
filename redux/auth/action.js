import {
  SET_LOGGED_IN_USER,
  SET_LOGGED_OUT_USER,
  REFRESH_STATE,
  SET_IS_SIGNUP,
  RESET_IS_SIGNUP,
  SET_IS_SUBMITING,
  RESET_IS_SUBMITING
} from "./types";

export const setLoggedInUser = (user, token, role, isVerified) => ({
  type: SET_LOGGED_IN_USER,
  payload: { user, token, role, isVerified }
});

export const setLoggedOutUser = () => ({
  type: SET_LOGGED_OUT_USER
});

export const refreshState = () => ({
  type: REFRESH_STATE
});

export const setIsSignup = () => ({
  type: SET_IS_SIGNUP
});

export const resetIsSignup = () => ({
  type: RESET_IS_SIGNUP
});

export const setIsSubmiting = () => ({
  type: SET_IS_SUBMITING
});

export const resetIsSubmiting = () => ({
  type: RESET_IS_SUBMITING
});

export const fetchLoginUserThunkAction = ({ email, password }, onSuccess, onError) => {
  return async (dispatch) => {
    dispatch(setIsSubmiting());
    try {
      dispatch(setIsSignup());

      // Mocking API call response
      // const { data } = await postLoggedInUserApi({ email, password });

      const data = {
        success: true,
        data: {
          user: { email, roleId: "user", isVerified: true },
          accessToken: "some-token",
          businessCount: 1
        }
      };

      if (!data.success) {
        throw new Error(data.message);
      }

      console.log("Logged in successfully.");
      toast.success("Logged in successfully.");

      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("role", data.data.user.roleId);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("isVerified", data.data.user.isVerified);
      localStorage.setItem("isOnboardCount", data.data.businessCount);
      localStorage.setItem("userEmail", data.data.user.email);

      dispatch(
        setLoggedInUser(
          data.data.user,
          data.data.accessToken,
          data.data.user.roleId,
          data.data.user.isVerified
        )
      );
      onSuccess(data.data.user.isVerified, data.data.businessCount);
      dispatch(resetIsSignup());
    } catch (error) {
      dispatch(resetIsSignup());
      onError(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      dispatch(resetIsSubmiting());
    }
  };
};
