import axios from "axios";
import { updateHistory } from "./history";
import { setAuthMessage } from "./auth";
import { emitCountUpdate } from "./notification";
import { BACKEND_URL } from "../../config";

const api = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
});

const increment = (count) => {
  return {
    type: "INCREMENT",
    payload: count,
  };
};

const setCounter = (count) => {
  return {
    type: "SET_COUNTER",
    payload: count,
  };
};
const fetchCounter = () => {
  return async (dispatch) => {
    try {
      const { data } = await api.get("/api/counter");
      dispatch(setCounter(data.count));
    } catch (err) {
      const error = err.response ? err.response.data.message : "Server is down";
      dispatch(setAuthMessage({ message: error }));
    }
  };
};

const requestIncrement = ({ count, currentCount, name }) => {
  return async (dispatch) => {
    try {
      await api.patch("/api/counter", {
        increment: count,
      });
      currentCount++;
      dispatch(increment(count));
      emitCountUpdate({ name, action: "+1", currentCount });
      dispatch(updateHistory(currentCount));
    } catch (err) {
      let error;
      if (err.response && err.response.status === 401) {
        error = "Please login";
      } else if (err.response) {
        error = err.response.data.message;
      } else {
        error = "Server is down";
      }
      dispatch(setAuthMessage({ message: error }));
    }
  };
};

export { requestIncrement, fetchCounter, setCounter };
