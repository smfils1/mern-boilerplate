import axios from "axios";

const registerAuth = ({ isAuth, message }) => {
  return {
    type: "REGISTER_AUTH",
    payload: { isAuth, message },
  };
};

const requestAuth = ({ isAuth, message }) => {
  return {
    type: "REQUEST_AUTH",
    payload: { isAuth, message },
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
      const res = await axios.post(
        "http://localhost:5000/api/users/signup",
        data
      );
      dispatch(
        requestAuth({
          isAuth: false,
          message: { success: "Authentication is successful. Please login." },
        })
      );
    } catch (err) {
      const error = err.response ? err.response.data.message : "Server is down";
      dispatch(
        requestAuth({
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
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        data
      );
      dispatch(
        requestAuth({
          isAuth: true,
          message: {},
        })
      );
      console.log(history);
      history.push("/");
    } catch (err) {
      console.log(err);

      const error = err.response ? err.response.data.message : "Server is down";
      dispatch(
        requestAuth({
          isAuth: false,
          message: { error },
        })
      );
    }
  };
};
export { registerUser, loginUser, clearAuthMessage };
