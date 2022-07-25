import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import { log_user, verify } from "../auth-reducers/AuthReducers";

function Activate() {
  const { uid, token } = useParams();
  const dispatch = useDispatch;
  const navigate = useNavigate();

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
            src={require("../images/welcome.gif")}
          />
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              onClick={() => {
                verify(dispatch, uid, token);
                navigate("/login");
              }}
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
