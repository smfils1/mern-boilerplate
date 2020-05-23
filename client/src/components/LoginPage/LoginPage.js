import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser, clearAuthMessage } from "../../redux/actions/auth";
import Alert from "react-bootstrap/Alert";

class LoginPage extends Component {
  state = {
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
      email: this.state.email,
      password: this.state.password,
    };
    await this.props.loginUser(user, this.props.history);
  };

  alertMessage = ({ error }) => {
    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    }
  };

  render() {
    return (
      <div className="container" style={{ marginTop: "50px", width: "700px" }}>
        <h2 style={{ marginBottom: "40px" }}>Login</h2>
        <form onSubmit={this.handleSubmit}>
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
              Login User
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
    loginUser: (data, history) => dispatch(loginUser(data, history)),
    clearAuthMessage: () => dispatch(clearAuthMessage()),
  };
};
//export default LoginPage;
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
