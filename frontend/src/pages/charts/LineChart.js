//chart.js imports
import { Line } from "react-chartjs-2";
import "chart.js/auto";

import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
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
import AuthenticatedStatus from "../../auth-components/AuthenticatedStatus";
import { chart_create } from "../../auth-reducers/AuthReducers";
import { useDispatch, useSelector } from "react-redux";

function LineChart() {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user.user)

  const [authenticated, setAuthenticated] = useState(false)

  const [started, setStarted] = useState(false);
  const [currentDataset, setCurrentDataset] = useState(0);
  const [main, setMain] = useState(false);

  //dataset data
  const [chartData, setChartData] = useState([]);

  const [colors, setColors] = useState(["#aabbcc"]);

  //chart options
  const [chartOptions, setChartOptions] = useState([]);

  //chart titles
  const [datasetTitles, setDatasetTitles] = useState(["Dataset"]);

  const [chartTitle, setChartTitle] = useState("My Line Chart");

  const basicAxisTitles = {
    x: "X-Axis",
    y: "Y-Axis",
  };

  const [axisTitles, setAxisTitles] = useState(basicAxisTitles);

  const basicChartOptions = {
    scales: {
      x: {
        title: {
          display: "true",
          text: axisTitles.x,
        },
        type: "linear",
        display: true,
        beginAtZero: true,
      },
      y: {
        display: true,
        title: {
          display: true,
          text: axisTitles.y,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: chartTitle,
      },
    },
  };

  useEffect(() => {
    if (!started) {
      setCurrentDataset(0);

      setAxisTitles(basicAxisTitles);

      setDatasetTitles(["Dataset"]);

      setChartOptions(basicChartOptions);

      setChartData([
        {
          label: datasetTitles[currentDataset],
          data: [],
          fill: false,
          borderColor: colors[currentDataset],
          tension: 0.1,
        },
      ]);

      setStarted(true);
    }
  }, [started]);

  //update data in the chart in-real-time
  useEffect(() => {
    const upd = () => {
      let newChartData = [...chartData];
      newChartData[currentDataset].label = datasetTitles[currentDataset];
      setChartData(newChartData);
    };
    if (started) {
      upd();
    }
  }, [started, chartTitle, datasetTitles, currentDataset]);

  const pointForm = (
    <Popover>
      <Popover.Header as="h3">Datapoint</Popover.Header>
      <Popover.Body>
        <Form onSubmit={(e) => addPoint(e)}>
          <Form.Group className="mb-3" controlId="xValue">
            <Form.Label>X</Form.Label>
            <Form.Control name="x" type="number" placeholder="0" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="yValue">
            <Form.Label>Y</Form.Label>
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

    let newChartData = [...chartData]

    let xA = [];

    if (newChartData[currentDataset]["data"][0]) {
      xA = [
        newChartData[currentDataset]["data"].map((dataPoint) => {
          return dataPoint.x;
        }),
      ];
    }

    const pos = sortedIndex(xA, e.target[0].value, 0, xA.length);

    newChartData[currentDataset]["data"].splice(pos, 0, {
      x: e.target[0].value,
      y: e.target[1].value,
    })

    setChartData(newChartData);
  };

  const deleteDataPoint = (i) => {
    let newChartData = [...chartData];
    newChartData[currentDataset]["data"].splice(i, 1);
    setChartData(newChartData);
  };

  const changeTitle = (e) => {
    let cT = null;
    if (e.target.name === "title") {
      let newTitles = [...datasetTitles];
      newTitles[currentDataset] = e.target.value;
      setDatasetTitles(newTitles);
    } else {
      if (e.target.name === "chartTitle") {
        cT = e.target.value;
        setChartTitle(e.target.value);
      } else {
        let newAxisTitles = axisTitles;
        newAxisTitles[e.target.name] = e.target.value;
        setAxisTitles(newAxisTitles);
      }
    }
    if (!cT) {
      cT = chartTitle;
    }
    setChartOptions(basicChartOptions);
  };

  const changeColor = (e) => {
    let newColors = [...colors];
    newColors[currentDataset] = e;
    setColors(newColors);

    let newChartData = [...chartData];
    newChartData[currentDataset].borderColor = colors[currentDataset];
    setChartData(newChartData);
  };

  const addDataset = () => {
    let newDatasetTitles = [...datasetTitles];
    newDatasetTitles.push("Dataset");
    setDatasetTitles(newDatasetTitles);

    let newChartData = [...chartData];
    newChartData.push({
      label: "Dataset",
      data: [],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    });
    setChartData(newChartData);

    setColors([...colors, "rgb(75, 192, 192)"]);
  };

  const changeDatasetNum = (e) => {
    setCurrentDataset(e.target.name);
  };

  const data = {
    datasets: chartData,
  };

  //L represents Linear
  const chartType = 'L'

  const mainTitles = [
    {
      title: "Chart",
      name: "chartTitle",
      value: chartTitle,
    },
    {
      title: "X-Axis",
      name: "x",
      value: axisTitles.x,
    },
    {
      title: "Y-Axis",
      name: "y",
      value: axisTitles.y,
    },
  ];

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
                  onClick={()=>chart_create(dispatch, chartType, chartOptions, data, user.name)}
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

              <Nav variant="tabs" defaultActiveKey="0">
                <Nav.Link onClick={() => setMain(true)} eventKey="main">
                  Main
                </Nav.Link>
                {datasetTitles.map((dataset, i) => {
                  return (
                    <Nav.Item
                      onClick={(e) => {
                        setMain(false);
                        changeDatasetNum(e);
                      }}
                    >
                      <Nav.Link name={i} key={i} eventKey={i}>
                        {dataset}
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
                <Nav.Item>
                  <Nav.Link onClick={() => addDataset()}>Add Dataset</Nav.Link>
                </Nav.Item>
              </Nav>
              <Card.Body className="me-5 ms-5">
                <hr />
                {main ? (
                  mainTitles.map((groupItem) => {
                    return (
                      <Form.Group className="mb-3">
                        <Form.Label>{groupItem.title} Title</Form.Label>
                        <Form.Control
                          onChange={(e) => changeTitle(e)}
                          type="text"
                          name={groupItem.name}
                          value={groupItem.value}
                        />
                      </Form.Group>
                    );
                  })
                ) : (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Dataset Title</Form.Label>
                      <Form.Control
                        onChange={(e) => changeTitle(e)}
                        type="text"
                        name="title"
                        value={datasetTitles[currentDataset]}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Line Color</Form.Label>
                      <HexColorPicker
                        style={{ width: "8vw", height: "8vw" }}
                        color={colors[currentDataset]}
                        onChange={(e) => changeColor(e)}
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
                              Point: ({dataPoint.x}, {dataPoint.y})
                              <ImCross
                                onClick={() => deleteDataPoint(i)}
                                style={{ color: "red", margin: "0 0 0 15" }}
                              />
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default LineChart;
