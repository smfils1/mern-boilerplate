import axios from "axios";
import { setUser } from "./user";

const request = axios.create({
  withCredentials: true,
});
const requestRegistration = ({ isAuth, message }) => {
  return {
    type: "REQUEST_REGISTRATION",
    payload: { isAuth, message },
  };
};

const requestResetLink = ({ message }) => {
  return {
    type: "REQUEST_RESET_LINK",
    payload: { message },
  };
};

const requestPasswordReset = ({ message }) => {
  return {
    type: "REQUEST_RESET",
    payload: { message },
  };
};
const requestLogin = ({ isAuth, message }) => {
  return {
    type: "REQUEST_LOGIN",
    payload: { isAuth, message },
  };
};

const logout = ({ isAuth }) => {
  return {
    type: "LOGOUT",
    payload: { isAuth },
  };
};

const requestAuth = ({ isAuth }) => {
  return {
    type: "REQUEST_AUTH",
    payload: { isAuth },
  };
};

const clearAuthMessage = () => {
  return {
    type: "CLEAR_AUTH_MESSAGE",
    payload: { message: {} },
  };
};

const sendResetLink = (data) => {
  return async (dispatch) => {
    try {
      await request.post("http://localhost:5000/api/auth/forgot", data);
      dispatch(
        requestResetLink({
          message: { success: "Reset Link has been sent" },
        })
      );
    } catch (err) {
      const error = err.response ? err.response.data.message : "Server is down";
      dispatch(
        requestResetLink({
          message: { error },
        })
      );
    }
  };
};

//TODO
const resetPassword = (data, id) => {
  return async (dispatch) => {
    try {
      await request.post(`http://localhost:5000/api/auth/reset/${id}`, data);
      dispatch(
        requestPasswordReset({
          message: { success: "Reset Link has been sent" },
        })
      );
    } catch (err) {
      console.log(err.response.data.message);
      const error = err.response ? err.response.data.message : "Server is down";
      dispatch(
        requestPasswordReset({
          isAuth: false,
          message: { error },
        })
      );
    }
  };
};
const registerUser = (data) => {
  return async (dispatch) => {
    try {
      await request.post("http://localhost:5000/api/auth/register", data);
      dispatch(
        requestRegistration({
          isAuth: false,
          message: { success: "Authentication is successful. Please login." },
        })
      );
    } catch (err) {
      const error = err.response ? err.response.data.message : "Server is down";
      dispatch(
        requestRegistration({
          isAuth: false,
          message: { error },
        })
      );
    }
  };
};

const loginUser = (formData, history) => {
  return async (dispatch) => {
    try {
      const { data } = await request.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      dispatch(
        requestLogin({
          isAuth: true,
          message: {},
        })
      );

      dispatch(
        setUser({
          name: data.name,
          email: data.email,
        })
      );
      history.push("/");
    } catch (err) {
      const error = err.response ? err.response.data.message : "Server is down";
      dispatch(
        requestLogin({
          isAuth: false,
          message: { error },
        })
      );
    }
  };
};

const logoutUser = (history) => {
  return async (dispatch) => {
    try {
      await request.get("http://localhost:5000/api/auth/logout");
      dispatch(
        logout({
          isAuth: false,
        })
      );
      dispatch(
        setUser({
          name: "Guest",
          email: null,
        })
      );
      history.push("/");
    } catch (err) {
      dispatch(
        logout({
          isAuth: false,
        })
      );
      console.log(err);
    }
  };
};

const auth = () => {
  return async (dispatch) => {
    try {
      const { data } = await request.get("http://localhost:5000/api/users");
      dispatch(
        requestAuth({
          isAuth: true,
        })
      );

      dispatch(
        setUser({
          name: data.name,
          email: data.email,
        })
      );
    } catch (err) {
      dispatch(
        requestAuth({
          isAuth: false,
        })
      );
    }
  };
};
export {
  registerUser,
  loginUser,
  auth,
  clearAuthMessage,
  logoutUser,
  sendResetLink,
  resetPassword,
};
