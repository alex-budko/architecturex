import { useDispatch, useSelector } from "react-redux";
import { activation_fail, activation_success } from "../features/user";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

function Activate() {
  const { uid, token } = useParams();

  const dispatch = useDispatch;
  const navigate = useNavigate()

  async function verify(uid, token) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ uid: uid, token: token });

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
        body,
        config
      );
      dispatch(activation_success());
    } catch (err) {
      dispatch(activation_fail());
    }
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col />
        <Col xs={6}>
            <Image
              width={"100%"}
              height={"60%"}
              alt="Welcome!"
              className="mb-4"
              src={require("../images/welcome.png")}
            />
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              onClick={() => {
                verify(uid, token)
                navigate('/login')
              }
            }
              size="md"
              type="submit"
            >
              Confirm
            </Button>
          </div>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default Activate;
