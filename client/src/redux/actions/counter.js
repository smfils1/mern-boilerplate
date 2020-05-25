import axios from "axios";

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
      dispatch(setCounter(data.counter));
    } catch (err) {
      return;
    }
  };
};

const requestIncrement = (count) => {
  return async (dispatch) => {
    try {
      await api.patch("http://localhost:5000/api/users", { counter: count });
      dispatch(increment(count));
    } catch (err) {
      return;
    }
  };
};

export { requestIncrement, fetchCounter };
