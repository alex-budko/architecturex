//chart.js imports
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";

import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
//bootstrap imports
import {
  ButtonGroup,
  Card,
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
import { useParams } from "react-router";
import {
  Center,
  Container,
  Heading,
  HStack,
  Button,
  Box,
  Flex,
  Stack,
  Wrap,
  FormLabel,
  WrapItem,
  Divider,
} from "@chakra-ui/react";

function Chart() {
  const dispatch = useDispatch();

  const { chart_type } = useParams();

  const user = useSelector((state) => state.user.user);

  const [authenticated, setAuthenticated] = useState(false);

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

  const linear = () => {
    return chart_type === "line";
  };

  const basicChartOptions = linear()
    ? {
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
      }
    : {
        scales: {
          x: {
            title: {
              display: "true",
              text: axisTitles.x,
            },
            display: true,
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
          borderDash: [0, 0],
          borderColor: colors[currentDataset],
          backgroundColor: colors[currentDataset],
          tension: 0,
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

  //change chart title in real-time
  useEffect(() => {
    if (started) {
      setChartOptions(basicChartOptions);
    }
  }, [chartTitle, axisTitles, started]);

  const pointForm = (
    <Popover>
      <Popover.Header as="h3">Datapoint</Popover.Header>
      <Popover.Body>
        <Form onSubmit={(e) => addPoint(e)}>
          <Form.Group className="mb-3" controlId="xValue">
            <Form.Label style={{ display: "inline" }}>
              {linear() ? "X:" : "Name:"}
            </Form.Label>
            {linear() ? (
              <Form.Control
                style={{ display: "inline", width: "10vw", marginRight: "5px" }}
                name="x"
                type="number"
                placeholder="0"
                required
              />
            ) : (
              <Form.Control
                style={{ display: "inline", width: "10vw", marginRight: "5px" }}
                name="x"
                type="text"
                placeholder="September"
                required
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="yValue">
            <Form.Label style={{ display: "inline" }}>Y: </Form.Label>
            <Form.Control
              style={{ display: "inline", width: "10vw", marginRight: "5px" }}
              name="y"
              type="number"
              placeholder="0"
              required
            />
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
    let pos = 0;

    let newChartData = [...chartData];

    if (linear()) {
      let xA = [];

      if (newChartData[currentDataset]["data"][0]) {
        xA = [
          newChartData[currentDataset]["data"].map((dataPoint) => {
            return dataPoint.x;
          }),
        ];
      }

      pos = sortedIndex(xA, e.target[0].value);
    }

    newChartData[currentDataset]["data"].splice(pos, 0, {
      x: e.target[0].value,
      y: e.target[1].value,
    });

    setChartData(newChartData);
  };

  const deleteDataPoint = (i) => {
    let newChartData = [...chartData];
    newChartData[currentDataset]["data"].splice(i, 1);
    setChartData(newChartData);
  };

  const changeTitle = (e) => {
    if (e.target.name === "title") {
      let newTitles = [...datasetTitles];
      newTitles[currentDataset] = e.target.value;
      setDatasetTitles(newTitles);
    } else {
      if (e.target.name === "chartTitle") {
        setChartTitle(e.target.value);
      } else {
        let newAxisTitles = axisTitles;
        newAxisTitles[e.target.name] = e.target.value;
        setAxisTitles(newAxisTitles);
      }
    }
    setChartOptions(basicChartOptions);
  };

  const changeColor = (e) => {
    let newColors = [...colors];
    newColors[currentDataset] = e;
    setColors(newColors);

    let newChartData = [...chartData];
    newChartData[currentDataset].borderColor = colors[currentDataset];
    newChartData[currentDataset].backgroundColor = colors[currentDataset];
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
      borderDash: [0, 0],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgb(75, 192, 192)",
      tension: 0,
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
  const chartType = linear() ? "L" : "B";

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
    <Center>
      <Flex>
        {started && (
          <Wrap spacing={6} justify="center">
            <WrapItem>
              <Center>
                <Box
                  p="15"
                  height={[
                    "300px", // 48em-62em
                    "450px", // 62em+
                    "500px", // 48em-62em
                    "500px", // 62em+
                  ]}
                  bg="teal.400"
                  width={[
                    "500px", // 48em-62em
                    "560px", // 62em+
                    "660px", // 48em-62em
                    "600px", // 62em+
                  ]}
                  bgColor={"gray.300"}
                  rounded={"md"}
                >
                  <Center>
                    <Heading mb={3} color={"orange.400"}>
                      {linear() ? "Line" : "Bar"} Chart
                    </Heading>
                  </Center>
                  <Divider color="orange.300" orientation="horizontal" />

                  <Container>
                    <Center>
                      <Box
                        rounded={"md"}
                        w={[
                          "450px", // 0-30em
                          "500px", // 30em-48em
                          "600px", // 48em-62em
                          "560px", // 62em+
                        ]}
                        bgColor="gray.100"
                        mt={2}
                        mb={2}
                        p={2}
                      >
                        {linear() ? (
                          <Line options={chartOptions} data={data} />
                        ) : (
                          <Bar options={chartOptions} data={data} />
                        )}
                      </Box>
                    </Center>

                    <Center>
                      <HStack spacing={3}>
                        <Button
                          colorScheme={"green"}
                          variant="solid"
                          onClick={() =>
                            chart_create(
                              dispatch,
                              chartType,
                              chartOptions,
                              data,
                              user.name
                            )
                          }
                        >
                          Save
                        </Button>
                        <Button
                          colorScheme={"red"}
                          onClick={() => setStarted(false)}
                        >
                          Scrap
                        </Button>
                      </HStack>
                    </Center>
                  </Container>
                </Box>
              </Center>
            </WrapItem>
            <WrapItem>
              <Center>
                <Box
                  p="15"
                  height={[
                    "300px", // 48em-62em
                    "450px", // 62em+
                    "500px", // 48em-62em
                    "500px", // 62em+
                  ]}
                  bg="teal.400"
                  width={[
                    "500px", // 48em-62em
                    "560px", // 62em+
                    "660px", // 48em-62em
                    "600px", // 62em+
                  ]}
                  bgColor={"gray.300"}
                  rounded={"md"}
                >
                  <Center>
                    <Heading mb={3} color={"orange.400"}>
                      Data Panel
                    </Heading>
                  </Center>

                  <Nav variant="tabs" defaultActiveKey="0">
                    <Nav.Link
                      className="me-1"
                      style={{
                        color: "#2D3748",
                        backgroundColor: "#FBD38D",
                        fontWeight: "bold",
                      }}
                      onClick={() => setMain(true)}
                      eventKey="main"
                    >
                      Main
                    </Nav.Link>
                    {datasetTitles.map((dataset, i) => {
                      return (
                        <Nav.Item
                          align="center"
                          onClick={(e) => {
                            setMain(false);
                            changeDatasetNum(e);
                          }}
                        >
                          <Nav.Link
                            className="me-1"
                            style={{
                              color: "#171923",
                              backgroundColor: "#FBD38D",
                              fontWeight: "bold",
                            }}
                            align="center"
                            name={i}
                            key={i}
                            eventKey={i}
                          >
                            {dataset}
                          </Nav.Link>
                        </Nav.Item>
                      );
                    })}
                    <Nav.Item>
                      <Nav.Link
                        style={{
                          backgroundColor: "#2B6CB0",
                          color: "white",
                          fontWeight: "bold",
                        }}
                        onClick={() => addDataset()}
                      >
                        Add Dataset
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Container ml={0}>
                    {main ? (
                      mainTitles.map((groupItem) => {
                        return (
                          <Form.Group className="mb-3">
                            <FormLabel color={"orange.500"}>
                              {groupItem.title} Title
                            </FormLabel>
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
                      <Container>
                        <Form.Group className="mb-3">
                          <FormLabel color={"orange.500"}>
                            Dataset Title
                          </FormLabel>
                          <Form.Control
                            onChange={(e) => changeTitle(e)}
                            type="text"
                            name="title"
                            value={datasetTitles[currentDataset]}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <FormLabel color={"orange.500"}>Line Color</FormLabel>
                          <HexColorPicker
                            style={{ width: "16vw", height: "12vh" }}
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
                            {chartData[currentDataset].data === [] ? (
                              chartData[currentDataset].data.map(
                                (dataPoint, i) => {
                                  return (
                                    <Dropdown.Item key={i}>
                                      Point: ({dataPoint.x}, {dataPoint.y})
                                      <ImCross
                                        onClick={() => deleteDataPoint(i)}
                                        style={{
                                          color: "red",
                                          margin: "0 0 0 15",
                                        }}
                                      />
                                    </Dropdown.Item>
                                  );
                                }
                              )
                            ) : (
                              <Card.Text align="center">No Data</Card.Text>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Container>
                    )}
                  </Container>
                </Box>
              </Center>
            </WrapItem>
          </Wrap>
        )}
      </Flex>
    </Center>
  );
}

export default Chart;
