import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loadin, loadin_fail, login, login_fail } from "../features/user";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";


import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";


function Login() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;
  const [invalid, setInvalid] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const changeInfo = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setInvalid(false);
    log_user(email, password);
    if (!isAuthenticated) {
      setTimeout(()=> {
        setFormData({ email: "", password: "" })
        setInvalid(true);
      }, 500)
    }
  };

  async function log_user(email, password) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      email,
      password,
    });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
        body,
        config
      );
      dispatch(login(res.data));
      load_user();
    } catch (err) {
      dispatch(login_fail());
    }
  }

  async function load_user() {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/users/me/`,
          config
        );
        dispatch(loadin(res.data));
      } catch (err) {
        dispatch(loadin_fail());
      }
    } else {
      dispatch(loadin_fail());
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
                  isInvalid={invalid}
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

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <FloatingLabel controlId="floatingInput" label="Password">
                <Form.Control
                  required
                  isInvalid={invalid}
                  value={password}
                  onChange={(e) => changeInfo(e)}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </FloatingLabel>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-4" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember Me" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-4 text-end"
                  controlId="formBasicCheckbox"
                >
                  <Link to="/password/reset/">Forgot Password</Link>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid gap-2">
              <Button variant="primary" size="md" type="submit">
                Sign In
              </Button>
            </div>
          </Form>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default Login;
