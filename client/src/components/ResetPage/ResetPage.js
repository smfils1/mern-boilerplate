import React, { Component } from "react";
import { connect } from "react-redux";
import { isString, isPlainObject } from "lodash";
import { resetPassword, clearAuthMessage } from "../../redux/actions/auth";
import Alert from "react-bootstrap/Alert";

class ResetPage extends Component {
  state = {
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
      newPassword: this.state.password,
    };
    await this.props.resetPassword(user, this.props.match.params.id);
  };

  alertMessage = ({ error, success }) => {
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
        <h2 style={{ marginBottom: "40px" }}>Reset Password</h2>
        <form onSubmit={this.handleSubmit}>
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
              Reset Password
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
    resetPassword: (data, id) => dispatch(resetPassword(data, id)),
    clearAuthMessage: () => dispatch(clearAuthMessage()),
  };
};
//export default LoginPage;
export default connect(mapStateToProps, mapDispatchToProps)(ResetPage);
