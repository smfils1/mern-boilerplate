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

const loginUser = (formData, history) => {
  return async (dispatch) => {
    try {
      const { data } = await request.post(
        "http://localhost:5000/api/users/login",
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
          username: data.name,
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
      await request.get("http://localhost:5000/api/logout");
      dispatch(
        logout({
          isAuth: false,
        })
      );
      dispatch(
        setUser({
          username: "Guest",
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
      const { data } = await request.get("http://localhost:5000/api/user");
      dispatch(
        requestAuth({
          isAuth: true,
        })
      );

      dispatch(
        setUser({
          username: data.name,
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
export { registerUser, loginUser, auth, clearAuthMessage, logoutUser };
