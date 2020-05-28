import React, { Component } from "react";
import { useSelector, useDispatch } from "react-redux";

import Counter from "../Counter";

export default () => {
  const user = useSelector(({ user }) => user);
  return (
    <div className="min-vh-100  bg-dark text-white">
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
