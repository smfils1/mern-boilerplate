import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/auth";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import AuthForm from "./AuthForm";
import { BACKEND_URL } from "../config";

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    await dispatch(loginUser(values, props.history));
  };

  return (
    <Container className="p-md-5 d-flex flex-column">
      <h2 className="my-5">Login</h2>{" "}
      <AuthForm type="login" onSubmit={handleSubmit} />
      <p className="text-center mt-5">Or Sign In with</p>
      <a
        href={`${BACKEND_URL}/api/auth/google`}
        className="font-weight-bold align-self-center"
      >
        {" "}
        <Button
          variant="danger"
          style={{ width: "50px", height: "50px" }}
          className="rounded-circle "
        >
          <h4 className="p-0 m-0">G</h4>
        </Button>
      </a>
    </Container>
  );
};

export default withRouter(LoginPage);
