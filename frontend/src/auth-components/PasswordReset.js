import { useDispatch } from "react-redux";
import { useState } from "react";
import { password_reset_fail, password_reset_success } from "../features/user";
import axios from "axios";
import { Navigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";



function PasswordReset() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "" });
  const [requestSent, setRequestSent] = useState(false);
  const { email } = formData;
  
  if (requestSent) {
    return <Navigate to="/" />;
  }

  const changeInfo = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    reset_password(email);
    setRequestSent(true);
    console.log("Surely");
  };

  async function reset_password(email) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email });

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,
        body,
        config
      );
      dispatch(password_reset_success());
    } catch (err) {
      dispatch(password_reset_fail());
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

            <div className="d-grid gap-2">
              <Button variant="primary" size="md" type="submit">
                Reset Password
              </Button>
            </div>
          </Form>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default PasswordReset;
