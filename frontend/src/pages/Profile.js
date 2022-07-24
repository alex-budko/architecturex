import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import {
  charts_view,
  profile_update,
  profile_view,
} from "../auth-reducers/AuthReducers";
import { useParams } from "react-router-dom";

import { BiUpload } from "react-icons/bi";

import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import { Line } from "react-chartjs-2";

function Profile() {
  const [data, setData] = useState({
    user: "UNDEFINED",
    description: "",
    email: "",
    avatar: null,
  });

  const [charts, setCharts] = useState(null);

  const [description, setDescription] = useState({
    description: "",
  });

  const [updating, setUpdating] = useState(false);

  const { name } = useParams();

  useEffect(() => {
    profile_view(name).then((res) => setData(res.data));
    charts_view(name).then((res) => setCharts(res.data));
  }, [updating, name]);

  useEffect(() => {
    setDescription(data.description);
  }, [data]);

  console.log(charts);

  const CARD_WIDTH = "30vw";
  const CARD_HEIGHT = "80vh";
  const CARD_MARGIN = "4vh";
  return (
    <Container>
      <Row>
        <Col width={"1px"} />
        <Col>
          <Card
            style={{
              marginTop: CARD_MARGIN,
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
            }}
          >
            <Card>
              <Uploady
                style={{ cursor: "pointer", width: "30px" }}
                destination={{ url: "/C:/build/static/media/avatars/" }}
              >
                <UploadButton onClick={(e) => console.log(e)}>
                  <BiUpload />
                </UploadButton>
              </Uploady>
              <Card.Img display={"inline"} src={require("../images/pfp.png")} />
            </Card>

            <Card.Body align="center">
              <Card.Title>Username: {data.user}</Card.Title>
              <Card.Text
                style={{
                  marginTop: "5px",
                  fontSize: "smaller",
                }}
              >
                Email: {data.email}
              </Card.Text>
              <Button style={{ marginTop: "0px" }} variant="primary">
                Follow
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              marginTop: CARD_MARGIN,
              width: "40vw",
              height: "40vh",
              overflow: "scroll"
            }}
          >
            <Card.Body  align="center">
              <Card.Title>Charts</Card.Title>
              <Row>
                {charts &&
                  charts.map((chart) => {
                    return (
                      <Col>
                        <Line
                          style={{width: "250px", height: "100px"}}
                          options={chart.options}
                          data={chart.data}
                          key={chart.id}
                        />
                      </Col>
                    );
                  })}
              </Row>
              <Button as={Link} to={`/charts/${name}`} variant="primary">
                View All
              </Button>
            </Card.Body>
          </Card>
          <Card
            style={{
              marginTop: CARD_MARGIN,
              width: "40vw",
              height: "40vh",
            }}
          >
            <Card.Body align="center">
              <Card.Title>Description</Card.Title>

              <InputGroup
                style={{
                  marginTop: "10px",
                  padding: "1px",
                  marginBottom: "10px",
                  height: "20vh",
                }}
              >
                <Form.Control
                  className="text-dark bg-light"
                  value={description}
                  size="sm"
                  aria-label="Description"
                  as="textarea"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  disabled={!updating}
                />
              </InputGroup>
              {!updating ? (
                <Button
                  onClick={() => setUpdating(!updating)}
                  variant="primary"
                >
                  Update
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setUpdating(!updating);
                    profile_update(data.user, data.email, description);
                  }}
                  variant="primary"
                >
                  Confirm
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col width={"1px"} />
      </Row>
    </Container>
  );
}

export default Profile;
