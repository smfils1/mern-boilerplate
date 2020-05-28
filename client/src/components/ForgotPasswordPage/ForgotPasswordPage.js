import React, { Component } from "react";
import { connect } from "react-redux";
import { sendResetLink, clearAuthMessage } from "../../redux/actions/auth";
import Alert from "react-bootstrap/Alert";

class ForgotPasswordPage extends Component {
  state = {
    email: "",
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
    };
    await this.props.sendResetLink(user);
  };

  alertMessage = ({ error, success }) => {
    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    } else if (success) {
      return <Alert variant="success">{success}</Alert>;
    }
  };

  render() {
    return (
      <div className="container" style={{ marginTop: "50px", width: "700px" }}>
        <h2 style={{ marginBottom: "40px" }}>Forgot Password</h2>
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
          {this.alertMessage(this.props.auth.message)}

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Send Reset Link
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
    sendResetLink: (data) => dispatch(sendResetLink(data)),
    clearAuthMessage: () => dispatch(clearAuthMessage()),
  };
};
//export default LoginPage;
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);
