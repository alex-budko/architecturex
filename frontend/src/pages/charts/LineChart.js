//chart.js imports
import { Line } from "react-chartjs-2";
import "chart.js/auto";

import { useEffect, useRef, useState } from "react";

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
  Nav,
} from "react-bootstrap";

import { ImCross } from "react-icons/im";
import { sortedIndex } from "../../utils/sortedIndex";
// import { ColorPicker } from "../../chart-components/ColorPicker";

function LineChart() {
  const [started, setStarted] = useState(false);
  const [datasetTabs, setDatasetTabs] = useState([]);
  const [menuTabs, setMenuTabs] = useState([]);

  const [currentDataset, setCurrentDataset] = useState(0);

  //dataset data
  const [chartData, setChartData] = useState([]);

  //chart options
  const [chartOptions, setChartOptions] = useState([]);

  //chart titles
  const [datasetTitles, setDatasetTitles] = useState([
    {
      title: "Dataset",
      x: "X-Axis",
      y: "Y-Axis",
    },
  ]);

  const [chartLabels, setChartLabels] = useState([]);

  useEffect(() => {
    if (!started) {
      setChartLabels([]);
      setCurrentDataset(0);

      setDatasetTitles([
        {
          title: "Dataset",
          x: "X-Axis",
          y: "Y-Axis",
        },
      ]);

      setChartOptions({
        scales: {
          x: {
            title: {
              display: "true",
              text: datasetTitles[currentDataset].x,
            },
            type: "linear",
            display: true,
            beginAtZero: true,
          },
          y: {
            display: true,
            title: {
              display: true,
              text: datasetTitles[currentDataset].y,
            },
          },
        },
      });
      setChartData([
        {
          label: datasetTitles[currentDataset].title,
          data: [],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ]);

      setChartLabels([]);

      setStarted(true);
    }
  }, [started]);

  const pointForm = (
    <Popover>
      <Popover.Header as="h3">Datapoint</Popover.Header>
      <Popover.Body>
        <Form onSubmit={(e) => addPoint(e)}>
          <Form.Group className="mb-3" controlId="xValue">
            <Form.Label>X-Value</Form.Label>
            <Form.Control name="x" type="number" placeholder="0" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="yValue">
            <Form.Label>Y-Value</Form.Label>
            <Form.Control name="y" type="number" placeholder="0" required />
          </Form.Group>

          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </Popover.Body>
    </Popover>
  );

  const addPoint = (e) => {
    e.preventDefault();

    //x-value
    let newChartLabels = [...chartLabels];
    const pos = sortedIndex(
      newChartLabels,
      e.target[0].value,
      0,
      chartLabels.length
    );
    newChartLabels.splice(pos, 0, e.target[0].value);
    setChartLabels(newChartLabels);

    //y-value
    let newChartData = [...chartData];
    newChartData[0]["data"].splice(pos, 0, e.target[1].value);
    setChartData(newChartData);
  };

  const deleteDataPoint = (i) => {
    //x-value
    let newChartLabels = [...chartLabels];
    newChartLabels.splice(i, 1);
    setChartLabels(newChartLabels);

    //y-value
    let newChartData = [...chartData];
    newChartData[currentDataset]["data"].splice(i, 1);
    setChartData(newChartData);
  };

  const changeTitle = (e) => {
    let newTitles = [...datasetTitles];
    newTitles[currentDataset][e.target.name] = e.target.value;
    setDatasetTitles(newTitles);

    //update data in the chart in-real-time
    if (e.target.name === "title") {
      let newChartData = [...chartData];
      newChartData[currentDataset].label = datasetTitles[currentDataset].title;
      setChartData(newChartData);
    } else {
      setChartOptions({
        scales: {
          x: {
            title: {
              display: "true",
              text: datasetTitles[currentDataset].x,
            },
            type: "linear",
            display: true,
            beginAtZero: true,
          },
          y: {
            display: true,
            title: {
              display: true,
              text: datasetTitles[currentDataset].y,
            },
          },
        },
      });
    }
  };

  const data = {
    labels: chartLabels,
    datasets: chartData,
  };

  return (
    <Container align="center">
      {started && (
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
                <Line options={chartOptions} data={data} />

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
                  onClick={() => setStarted(false)}
                  variant="secondary"
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
                height: "80vh",
              }}
              align="center"
            >
              <Card.Title>Data Panel</Card.Title>
              <Nav variant="tabs" defaultActiveKey="1">
                <Nav.Item>
                  <Nav.Link eventKey="1">Dataset 1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="2">Dataset 2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="disabled" disabled>
                    Add Dataset
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Card.Body className="me-5 ms-5">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">Menu</Form.Label>
                  <Form.Select id="disabledSelect">
                    <option>Regular Properties</option>
                    <option>Hover Over Properties</option>
                    <option>Color Properties</option>
                  </Form.Select>
                </Form.Group>

                <hr />

                <Form.Group className="mb-3">
                  <Form.Label>Dataset Title</Form.Label>
                  <Form.Control
                    onChange={(e) => changeTitle(e)}
                    type="text"
                    name="title"
                    value={datasetTitles[currentDataset].title}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>X-Axis Title</Form.Label>
                  <Form.Control
                    onChange={(e) => changeTitle(e)}
                    type="text"
                    name="x"
                    value={datasetTitles[currentDataset].x}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Y-Axis Title</Form.Label>
                  <Form.Control
                    onChange={(e) => changeTitle(e)}
                    name="y"
                    type="text"
                    value={datasetTitles[currentDataset].y}
                  />
                </Form.Group>

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
                    {chartData[currentDataset].data.map((dataPoint, i) => {
                      return (
                        <Dropdown.Item key={i}>
                          Point: ({chartLabels[i]}, {dataPoint})
                          <ImCross
                            onClick={() => deleteDataPoint(i)}
                            style={{ color: "red", margin: "0 0 0 15" }}
                          />
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default LineChart;
