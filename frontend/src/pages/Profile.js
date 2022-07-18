import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

import { profile_view } from "../auth-reducers/AuthReducers";
import { useParams } from "react-router-dom";

function Profile() {

  const [data, setData] = useState({name: 'UNDEFINED', description: '', email: '', avatar: null})

  const dispatch = useDispatch()
  const { name } = useParams();

  useEffect(() => {
    profile_view(name).then((res)=> setData(res.data))
  }, []);

  const CARD_WIDTH = "42vw";
  const CARD_HEIGHT = "85vh";
  const CARD_MARGIN = "30px";
  return (
    <Container>
      <Row>
        <Col>
          <Card
            style={{
              marginTop: CARD_MARGIN,
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
            }}
          >
            <Image src={require("../images/pfp.png")} marginLeft={'auto'} height={'40%'} width={'40%'} />
            <Card.Body align="center">
              <Card.Title>{data.user}</Card.Title>
              <Card.Text style={{ marginTop: "10px", padding: "5px", fontSize: 'smaller' }}>
                {data.email}
              </Card.Text>
              <Card>
                <Card.Text style={{ marginTop: "10px", padding: "1px", fontSize: 'smaller' }}>
                  {data.description}
                </Card.Text>
              </Card>
              <Button style={{ marginTop: "10px" }} variant="primary">
                Update Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              marginTop: CARD_MARGIN,
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
            }}
          >
            <Card.Body align="center">
              <Card.Title>Charts</Card.Title>
              <Row>
                <Col>
                  <Card.Img src={require("../images/g.png")} />
                </Col>
                <Col>
                  <Card.Img src={require("../images/g.png")} />
                </Col>
              </Row>
              <Button as={Link} to="charts" variant="primary">
                View All
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
