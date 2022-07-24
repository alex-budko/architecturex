import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useMediaQuery } from "react-responsive";

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
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

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
  return (
    <Container>
      <Row>
        <Col fluid="sm">
          <Card
            style={{
              marginTop: "30px",
              width: !isTabletOrMobile ? `500px` : `250px`,
              height: !isTabletOrMobile ? `80vh` : `350px`,
            }}
          >
            {/* profile picture */}
            <Row>
              <Col></Col>
              <Col>
                <Container
                  align="center"
                  style={{
                    width: !isTabletOrMobile ? `250px` : `150px`,
                    height: !isTabletOrMobile ? `250px` : `150px`,
                  }}
                >
                  <Uploady
                    style={{ cursor: "pointer", width: "30px" }}
                    destination={{ url: "/C:/build/static/media/avatars/" }}
                  >
                    <UploadButton onClick={(e) => console.log(e)}>
                      <BiUpload />
                    </UploadButton>
                  </Uploady>

                  <Card.Img align="center" src={require("../images/pfp.png")} />
                </Container>
              </Col>
              <Col></Col>
            </Row>

            <Card.Body align="center">
              <Card.Title xs={6}>Username: {data.user}</Card.Title>
              <Card.Title xs={6}> Email: {data.email}</Card.Title>
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
        <Col fluid="sm">
          <Card
            style={{
              marginTop: "30px",
              width: !isTabletOrMobile ? `500px` : `250px`,
              height: !isTabletOrMobile ? `80vh` : `100px`,
              overflowX: "hidden",
              overflowY: "scroll",
            }}
          >
            <Card.Body align="center">
              <Card.Title>Charts</Card.Title>
              <Row>
                {charts &&
                  !isTabletOrMobile &&
                  charts.map((chart) => {
                    return (
                      <Col>
                        <Line
                          style={{ width: "250px", height: "100px" }}
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
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
