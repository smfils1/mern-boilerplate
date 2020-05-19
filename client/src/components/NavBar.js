import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const NavBar = () => (
  <Navbar variant="dark" bg="dark" expand="md" style={{ fontWeight: "300" }}>
    <Navbar.Brand>
      <Container>
        <div className="ml-auto" style={{ fontSize: "1.5em" }}>
          MERNcounter
        </div>
      </Container>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto text-uppercase" style={{ fontSize: "1.5em" }}>
        <p to="/" className="nav-link text-white m-3">
          Login
        </p>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavBar;
