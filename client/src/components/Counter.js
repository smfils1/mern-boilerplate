import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";

import { increment } from "../redux/actions/counter.js";

const Counter = () => {
  const counter = useSelector(({ counter }) => counter);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(increment());
  };

  return (
    <div className="text-center">
      <p
        style={{
          fontSize: "2.5em",
        }}
        className="p-md-5"
      >
        {counter}
      </p>
      <Button
        variant="success"
        className="m-3"
        size="lg"
        style={{
          outline: "none",
          margin: "0px",
          width: "200px",
          height: "200px",
          borderRadius: "100%",
          borderWidth: "0px",
          fontSize: "2em",
        }}
        onClick={handleClick}
      >
        Click Me
      </Button>
    </div>
  );
};

export default Counter;
