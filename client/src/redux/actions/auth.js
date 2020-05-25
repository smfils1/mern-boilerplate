import axios from "axios";
import Cookies from "js-cookie";

const request = axios.create({
  withCredentials: true,
});
const requestRegistration = ({ isAuth, message }) => {
  return {
    type: "REQUEST_REGISTRATION",
    payload: { isAuth, message },
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

const registerUser = (data) => {
  return async (dispatch) => {
    try {
      await request.post("http://localhost:5000/api/users/signup", data);
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

const loginUser = (data, history) => {
  return async (dispatch) => {
    try {
      await request.post("http://localhost:5000/api/users/login", data);
      dispatch(
        requestLogin({
          isAuth: true,
          message: {},
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
      await request.get("http://localhost:5000/api/logout");
      dispatch(
        logout({
          isAuth: false,
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
      await request.get("http://localhost:5000/api/user");
      dispatch(
        requestAuth({
          isAuth: true,
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
export { registerUser, loginUser, auth, clearAuthMessage, logoutUser };
