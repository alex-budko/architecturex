import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logout } from "../features/user";

function CustomNavbar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} className="me-5" to="/">
            Architecturex
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/support">
                Support
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
              <NavDropdown title="Create" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/chart/line">
                  Line Chart
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/chart/bar">
                  Bar Chart
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/">
                  View Your Charts
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {!user ? (
                <Fragment>
                  <Nav.Link as={Link} to="/login">
                    Log In
                  </Nav.Link>
                  <Nav.Link eventKey={2} as={Link} to="/signup">
                    Sign Up
                  </Nav.Link>
                </Fragment>
              ) : (
                <Fragment>
                  <Nav.Link as={Link} to={`/profile/${user.name}`}>
                    Hey {user.name}!
                  </Nav.Link>
                  <Nav.Link
                    eventKey={2}
                    as={Link}
                    to="/"
                    onClick={() => dispatch(logout())}
                  >
                    Log Out
                  </Nav.Link>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
