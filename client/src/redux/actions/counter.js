import axios from "axios";
import { updateHistory } from "./history";
const api = axios.create({
  withCredentials: true,
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
      const { data } = await api.get("http://localhost:5000/api/counter");
      dispatch(setCounter(data.count));
    } catch (err) {
      return;
    }
  };
};

const requestIncrement = (count, currentCount) => {
  return async (dispatch) => {
    try {
      await api.patch("http://localhost:5000/api/counter", {
        increment: count,
      });
      dispatch(increment(count));
      dispatch(updateHistory(currentCount + count));
    } catch (err) {
      return;
    }
  };
};

export { requestIncrement, fetchCounter };
