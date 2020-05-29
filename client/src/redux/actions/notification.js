import io from "socket.io-client";
import { setCounter } from "./counter";
const socket = io("http://localhost:5000");

const setNotification = ({ name, action }) => {
  return {
    type: "SET_NOTIFICATION",
    payload: { name, action },
  };
};

const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
    payload: null,
  };
};
const subscribeCountUpdate = () => {
  return (dispatch) => {
    socket.on("COUNTER_UPDATE", ({ name, action, currentCount }) => {
      dispatch(setNotification({ name, action }));
      dispatch(setCounter(currentCount));
    });
  };
};

const emitCountUpdate = ({ name, action, currentCount }) => {
  socket.emit("COUNTER_UPDATE", { name, action, currentCount });
};

export { subscribeCountUpdate, emitCountUpdate, clearNotification };
