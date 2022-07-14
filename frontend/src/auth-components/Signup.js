import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { signup, signup_fail } from "../features/user";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function Signup() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  //validation
  const [validPassword, setValidPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const { name, email, password, re_password } = formData;

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const changeInfo = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== re_password) {
      setValidPassword(true);
      setFormData({
        name: "",
        email: "",
        password: "",
        re_password: "",
      });
    } else {
      setValidPassword(false);
      sign_up(name, email, password, re_password);
    }
  };

  async function sign_up(name, email, password, re_password) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      name,
      email,
      password,
      re_password,
    });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/`,
        body,
        config
      );
      dispatch(signup(res.data));
    } catch (err) {
      dispatch(signup_fail());
    }
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col />
        <Col xs={6}>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Email">
                <Form.Control
                  required
                  value={email}
                  onChange={(e) => changeInfo(e)}
                  name="email"
                  type="email"
                  placeholder="Enter email"
                />
              </FloatingLabel>

              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <FloatingLabel controlId="floatingInput" label="Name">
                <Form.Control
                  required
                  value={name}
                  onChange={(e) => changeInfo(e)}
                  name="name"
                  type="text"
                  placeholder="Name"
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel controlId="floatingInput" label="Password" size="sm">
                <Form.Control
                  required
                  isInvalid={validPassword}
                  value={password}
                  onChange={(e) => changeInfo(e)}
                  onFocus={() => {
                    return <p>HELLO</p>;
                  }}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </FloatingLabel>
              <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel controlId="floatingInput" label="Repeat Password">
                <Form.Control
                  required
                  isInvalid={validPassword}
                  value={re_password}
                  onChange={(e) => changeInfo(e)}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  name="re_password"
                  type="password"
                  placeholder="Repeat Password"
                />
              </FloatingLabel>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" size="md" type="submit">
                Sign Up
              </Button>
            </div>
          </Form>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default Signup;
