import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useNavigate, useParams } from "react-router-dom";

function Profile() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const description = "This is my profile page. This is my profile page. This is my profile page. This is my profile page.";

  const navigate = useNavigate();
  const { name } = useParams();

  //   useEffect(() => {
  //     if (!isAuthenticated && name !== user.name) {
  //         navigate("/", { replace: true })
  //     }
  //     return;
  //   })

  const CARD_WIDTH = "25vw";
  const CARD_HEIGHT = "85vh";
  const CARD_MARGIN = "30px";
  return (
    <Container>
      <Row>
        <Col />
        <Col>
          <Card
            style={{
              marginTop: CARD_MARGIN,
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
            }}
          >
            <Card.Img variant="top" src={require("../images/pfp.png")} />
            <Card.Body align="center">
              <Card.Title>{name}</Card.Title>
              <Card.Text style={{marginTop: '10px', padding: '5px'}}>alex@gmail.com</Card.Text>
              <Card>
                <Card.Text style={{marginTop: '10px', padding: '5px'}}>{description}</Card.Text>
              </Card>
              <Button  style={{marginTop: '10px'}} variant="primary">Update Profile</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              marginTop: CARD_MARGIN,
              width: "55vw",
              height: CARD_HEIGHT,
            }}
          >
            <Card.Body align="center">
              <Card.Title>Charts</Card.Title>
              <Row>
                <Col>
                  <Card.Img src={require("../images/g.png")} />
                  <Card.Img src={require("../images/g.png")} />
                </Col>
                <Col>
                  <Card.Img src={require("../images/g.png")} />
                  <Card.Img src={require("../images/g.png")} />
                </Col>
              </Row>
              <Button as={Link} to="charts" variant="primary">
                View All
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default Profile;
