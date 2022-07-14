import { useDispatch } from "react-redux";
import {
  password_reset_confirm_success,
  password_reset_confirm_fail,
} from "../features/user";
import axios from "axios";
import { useParams } from "react-router";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function PasswordResetConfirm() {
  const dispatch = useDispatch();

  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const { uid, token } = useParams();

  const [formData, setFormData] = useState({ password: "", re_password: "" });

  const { password, re_password } = formData;

  if (passwordUpdated) {
    <Navigate to="/" />;
  }

  const changeInfo = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      reset_password_confirm(uid, token, password, re_password);
      console.log("Confirm");
      setPasswordUpdated(true);
    } else {
      setFormData({ password: "", re_password: "" });
      console.log("Passwords did not match");
    }
  };

  async function reset_password_confirm(
    uid,
    token,
    new_password,
    re_new_password
  ) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
        body,
        config
      );
      dispatch(password_reset_confirm_success());
    } catch (err) {
      dispatch(password_reset_confirm_fail());
    }
  }

  return (
    <Container className="mt-5">
    <Row>
      <Col />
      <Col xs={6}>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <FloatingLabel controlId="floatingInput" label="Password">
              <Form.Control
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                value={password}
                onChange={(e) => changeInfo(e)}
                name="password"
                type="password"
                placeholder="Enter Password"
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <FloatingLabel controlId="floatingInput" label="Repeat Password">
              <Form.Control
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                value={re_password}
                onChange={(e) => changeInfo(e)}
                name="re_password"
                type="password"
                placeholder="Repeat Password"
              />
            </FloatingLabel>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" size="md" type="submit">
              Confirm Reset Password
            </Button>
          </div>
        </Form>
      </Col>
      <Col />
    </Row>
  </Container>
  );
}

export default PasswordResetConfirm;
