import React from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/auth";
import AuthForm from "./AuthForm";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { BACKEND_URL } from "../config";

const RegisterPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    await dispatch(registerUser(values));
  };

  return (
    <Container className="p-md-5 d-flex flex-column">
      <h2 className="my-5">Register</h2>{" "}
      <AuthForm type="register" onSubmit={handleSubmit} />
      <p className="text-center mt-5">Or Sign Up with</p>
      <a
        href={`${BACKEND_URL}/api/auth/google`}
        className="font-weight-bold align-self-center"
      >
        {" "}
        <Button
          href=""
          variant="danger"
          style={{ width: "50px", height: "50px" }}
          className="rounded-circle font-weight-bold align-self-center"
        >
          <h4 className="p-0 m-0">G</h4>
        </Button>
      </a>
    </Container>
  );
};

export default RegisterPage;
