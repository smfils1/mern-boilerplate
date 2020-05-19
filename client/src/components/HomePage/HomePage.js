import React, { Component } from "react";
import Counter from "../Counter";
import NavBar from "../NavBar";

export default class HomePage extends Component {
  render() {
    return (
      <div className="min-vh-100  bg-dark text-white">
        <NavBar />
        <div>
          <p
            className="px-5 pt-5 pb-4 mt-md-5 text-center display-4"
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
  }
}
