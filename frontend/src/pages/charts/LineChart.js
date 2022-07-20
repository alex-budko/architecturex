//chart.js imports
import { Line } from "react-chartjs-2";
import "chart.js/auto";

//bootstrap imports
import {
  ButtonGroup,
  Button,
  Card,
  Row,
  Container,
  Col,
  Dropdown,
  OverlayTrigger,
  Form,
  Popover,
} from "react-bootstrap";

import { ImCross } from "react-icons/im";
import { ColorPicker } from "../../chart-components/ColorPicker";

const pointForm = (
  <Popover>
    <Popover.Header as="h3">Datapoint</Popover.Header>
    <Popover.Body>
      <Form>
        <Form.Group className="mb-3" controlId="xValue">
          <Form.Label>X-Value</Form.Label>
          <Form.Control type="number" placeholder="0" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="yValue">
          <Form.Label>Y-Value</Form.Label>
          <Form.Control type="number" placeholder="0" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Popover.Body>
  </Popover>
);

export const options = {
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

function LineChart() {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 60],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <Container aling='center'>
      <Row>
        <Col>
          <Card
            style={{
              marginTop: "3vh",
              width: "50vw",
              height: "80vh",
            }}
            align="center"
          >
            <Card.Title>Line Chart</Card.Title>
            <Card.Body className="m-5">
              <Line options={options} data={data} />

              <Button
                style={{
                  fontSize: "1vw",
                  marginRight: "1vw",
                  marginTop: "2vh",
                }}
              >
                Save
              </Button>
              <Button
                style={{ fontSize: "1vw", marginTop: "2vh" }}
              >
                Scrap
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              marginTop: "3vh",
              width: "35vw",
              height: "38vh",
            }}
            align="center"
          >
            <Card.Title>Data Panel</Card.Title>
            <Card.Body className="m-5">
              <Dropdown as={ButtonGroup}>
                <OverlayTrigger
                  trigger="click"
                  placement="left"
                  overlay={pointForm}
                >
                  <Button variant="info">Add Datapoint</Button>
                </OverlayTrigger>

                <Dropdown.Toggle
                  split
                  variant="primary"
                  id="dropdown-split-basic"
                />

                <Dropdown.Menu>
                  <Dropdown.Item>
                    Point 1: (12, 23){" "}
                    <ImCross style={{ color: "red", marginLeft: "6px" }} />
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Point 2: (13, 12)
                    <ImCross style={{ color: "red", marginLeft: "10px" }} />
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Point 3: (72, 45)
                    <ImCross style={{ color: "red", marginLeft: "10px" }} />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Body>
          </Card>
          <Card
            style={{
              marginTop: "3vh",
              width: "35vw",
              height: "38vh",
            }}
            align="center"
          >
            <Card.Title>Design Panel</Card.Title>
            <Card.Body className="m-5">
              <ColorPicker />
              <ColorPicker />
              <ColorPicker />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LineChart;
