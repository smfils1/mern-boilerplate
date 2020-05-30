import React, { useEffect } from "react";
import {
  subscribeCountUpdate,
  clearNotification,
} from "../redux/actions/notification";

import { clearAuthMessage } from "../redux/actions/auth";
import { useSelector, useDispatch } from "react-redux";

import { toast, ToastContainer } from "react-toastify";
import Counter from "./Counter";

import "react-toastify/dist/ReactToastify.css";
export default () => {
  const user = useSelector(({ user }) => user);
  const auth = useSelector(({ auth }) => auth);
  const notification = useSelector(({ notification }) => notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(subscribeCountUpdate());
  }, []);

  useEffect(() => {
    if (notification) notifyCount(notification);
  }, [notification]);

  useEffect(() => {
    if (auth) notifyError(auth);
  }, [auth]);

  const notifyCount = ({ name }) => {
    toast.success(`${name} +1`, {
      containerId: "count",
      autoClose: 1000,
      position: "top-left",
      onClose: () => {
        dispatch(clearNotification());
        toast.clearWaitingQueue();
      },
    });
  };

  const notifyError = ({ message }) => {
    toast.error(message, {
      containerId: "error",
      autoClose: 1000,
      position: "top-left",
      onClose: () => {
        dispatch(clearAuthMessage());
        toast.clearWaitingQueue();
      },
    });
  };

  return (
    <div className="min-vh-100  bg-dark text-white">
      <ToastContainer
        enableMultiContainer
        containerId={"count"}
        limit={1}
        style={{
          position: "static",
        }}
      />
      <ToastContainer enableMultiContainer containerId={"error"} limit={1} />

      <div>
        <p
          className="py-4 text-center"
          style={{
            fontSize: "2em",
          }}
        >
          Welcome {user.name}
        </p>
        <p
          className="p-4 text-center"
          style={{
            fontSize: "1.5em",
          }}
        >
          Help me reach{" "}
          <b
            style={{
              fontSize: "2em",
            }}
          >
            INFINITY
          </b>{" "}
        </p>
        <div className="d-flex justify-content-center align-items-center">
          <Counter />
        </div>
      </div>
    </div>
  );
};
