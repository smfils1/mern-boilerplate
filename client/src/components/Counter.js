import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class Counter extends Component {
  state = {
    count: 0,
  };

  handleClick = () => {
    this.setState(({ count }) => ({
      count: count + 1,
    }));
  };

  render() {
    return (
      <div className="text-center">
        <p
          style={{
            fontSize: "2.5em",
          }}
          className="p-md-5"
        >
          {this.state.count}
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
          onClick={this.handleClick}
        >
          Click Me
        </Button>
      </div>
    );
  }
}

export default Counter;
