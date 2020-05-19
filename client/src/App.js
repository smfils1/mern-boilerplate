import React from "react";
import Counter from "./components/Counter";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <div className="min-vh-100  bg-dark text-white">
        <NavBar />
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

export default App;
