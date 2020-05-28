import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser, clearAuthMessage } from "../../redux/actions/auth";
import { isString, isPlainObject } from "lodash";
import Alert from "react-bootstrap/Alert";
class RegisterPage extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    errors: {},
  };

  componentDidMount() {
    this.props.clearAuthMessage();
  }
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    await this.props.registerUser(user);
  };
  alertMessage = ({ success, error }) => {
    if (success) {
      return <Alert variant="success">{success}</Alert>;
    } else if (error && isString(error)) {
      return <Alert variant="danger">{error}</Alert>;
    } else if (error && isPlainObject(error)) {
      const errors = Object.values(error);

      return errors.map((err, index) => {
        return (
          <Alert key={index} variant="danger">
            {err}
          </Alert>
        );
      });
    }
  };
  render() {
    return (
      <div className="container" style={{ marginTop: "50px", width: "700px" }}>
        <h2 style={{ marginBottom: "40px" }}>Registration</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              name="name"
              onChange={this.handleInputChange}
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              name="email"
              onChange={this.handleInputChange}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
          </div>
          {this.alertMessage(this.props.auth.message)}
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (data) => dispatch(registerUser(data)),
    clearAuthMessage: () => dispatch(clearAuthMessage()),
  };
};
//export default RegisterPage;
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
