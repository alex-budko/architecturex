//chart.js imports
import { Bar, Bubble, Line, Pie } from "react-chartjs-2";
import "chart.js/auto";

import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

import NotAuthenticated from "../NotAuthenticated";

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
import { chart_create } from "../../auth-reducers/AuthReducers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  Center,
  Container,
  Heading,
  HStack,
  Button,
  Box,
  Flex,
  Wrap,
  FormLabel,
  WrapItem,
  Divider,
  Text,
} from "@chakra-ui/react";
import { capitalize } from "../../utils/capitalize";
import { LinearX } from "./components/LinearX";
import { LinearY } from "./components/LinearY";
import { BarX } from "./components/BarX";
import { BubbleR } from "./components/BubbleR";

function Chart() {
  const dispatch = useDispatch();

  const { chart_type } = useParams();

  const linear = () => {
    return chart_type === "line";
  };

  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

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

  const CHART_TITLES = {
    bar: "Bar",
    line: "Line",
    bubble: "Bubble",
    pie: "Pie",
  };

  const [chartTitle, setChartTitle] = useState(
    `My ${CHART_TITLES[chart_type]} Chart`
  );

  const basicAxisTitles = {
    x: "X-Axis",
    y: "Y-Axis",
  };

  const [axisTitles, setAxisTitles] = useState(basicAxisTitles);

  //basic chart options
  const BCO = {
    line: {
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
    },
    bar: {
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
    },
    bubble: {
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
    },
    pie: {
      plugins: {
        title: {
          display: true,
          text: chartTitle,
        },
      },
    },
  };

  //basic chart data
  const BCD = {
    line: {
      label: "Dataset",
      data: [],
      fill: false,
      borderDash: [0, 0],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgb(75, 192, 192)",
      tension: 0,
    },
    bar: {
      label: "Dataset",
      data: [],
      fill: false,
      borderDash: [0, 0],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgb(75, 192, 192)",
      tension: 0,
    },
    bubble: {
      label: "Dataset",
      data: [],
      fill: false,
      borderDash: [0, 0],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgb(75, 192, 192)",
      tension: 0,
    },
    pie: {
      label: "Dataset",
      data: [],
      fill: false,
      borderDash: [0, 0],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgb(75, 192, 192)",
      tension: 0,
    },
  };

  useEffect(() => {
    if (started) {
      setStarted(false);
    }
  }, [chart_type]);

  useEffect(() => {
    if (!started) {
      setCurrentDataset(0);

      setChartTitle(`My ${CHART_TITLES[chart_type]} Chart`);

      setAxisTitles(basicAxisTitles);

      setDatasetTitles(["Dataset"]);

      setChartOptions(BCO[chart_type]);

      setChartData([BCD[chart_type]]);

      setStarted(true);
    }
  }, [started]);

  //update data in the chart in-real-time
  useEffect(() => {
    if (started) {
      let newChartData = [...chartData];
      newChartData[currentDataset].label = datasetTitles[currentDataset];
      setChartData(newChartData);
    }
  }, [started, chartTitle, datasetTitles, currentDataset]);

  //change chart title in real-time
  useEffect(() => {
    if (started) {
      setChartOptions(BCO[chart_type]);
    }
  }, [chartTitle, axisTitles.x, axisTitles.y, started]);

  const pointForm = (
    <Popover style={{ backgroundColor: "#F6AD55" }}>
      <Center>
        <Heading color="orange.700" size="md">
          Datapoint
        </Heading>
      </Center>
      <Popover.Body>
        <Form onSubmit={(e) => ADD_FUNCTIONS[chart_type](e)}>
          <Wrap spacingY={"3"}>
            {chart_type === "line" ? (
              <>
                <LinearX />
                <LinearY />
              </>
            ) : chart_type === "bar" ? (
              <>
                <BarX />
                <LinearY />
              </>
            ) : chart_type === "bubble" ? (
              <>
                <LinearX />
                <LinearY />
                <BubbleR />
              </>
            ) : (
              <>
                <LinearX />
              </>
            )}
          </Wrap>

          <Center>
            <Button
              type="submit"
              _hover={{ bgColor: "orange.200" }}
              bgColor={"orange.400"}
              mt="3"
            >
              Submit
            </Button>
          </Center>
        </Form>
      </Popover.Body>
    </Popover>
  );

  const addPoint = (e) => {
    e.preventDefault();
    let newChartData = [...chartData];

    newChartData[currentDataset]["data"].push({
      x: e.target[0].value,
      y: e.target[1].value,
    });

    setChartData(newChartData);
  };

  const addBubblePoint = (e) => {
    e.preventDefault();

    let newChartData = [...chartData];

    newChartData[currentDataset]["data"].splice(0, 0, {
      x: e.target[0].value,
      y: e.target[1].value,
      r: e.target[2].value,
    });

    setChartData(newChartData);
  };

  const addPiePoint = (e) => {
    e.preventDefault();

    let newChartData = [...chartData];

    newChartData[currentDataset]["data"].splice(0, 0, e.target[0].value);

    setChartData(newChartData);
  };

  const ADD_FUNCTIONS = {
    bar: addPoint,
    line: addPoint,
    bubble: addBubblePoint,
    pie: addPiePoint,
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
    setChartOptions(BCO[chart_type]);
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
    newChartData.push(BCD[chart_type]);
    setChartData(newChartData);

    setColors([...colors, "rgb(75, 192, 192)"]);
  };

  const changeDatasetNum = (e) => {
    setCurrentDataset(e.target.name);
  };

  const data = {
    labels: [],
    datasets: chartData,
  };

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

  const RESPONSIVE_W = ["90vw", "80vw", "70vw", "660px", "600px"];
  const RESPONSIVE_H = ["400px", "480px", "550px", "580px", "560px"];

  return user === null ? (
    <NotAuthenticated />
  ) : (
    <Center>
      <Flex>
        {started && (
          <Wrap spacing={3} justify="center">
            <WrapItem>
              <Center>
                <Box
                  boxShadow={"2xl"}
                  shadow="dark-lg"
                  bg="gray.900"
                  rounded={"xl"}
                  mt="5"
                  height={RESPONSIVE_H}
                  width={RESPONSIVE_W}
                >
                  <Center>
                    <Heading mb={3} color={"orange.400"}>
                      {capitalize(chart_type)} Chart
                    </Heading>
                  </Center>
                  <Divider color="orange.300" orientation="horizontal" />

                  <Container>
                    <Center>
                      <Box
                        rounded={"md"}
                        width={["100%", "100%", "90%", "660px", "600px"]}
                        bgColor="gray.100"
                        mt={2}
                        mb={2}
                        p={2}
                      >
                        {chart_type === "line" ? (
                          <Line options={chartOptions} data={data} />
                        ) : chart_type === "bar" ? (
                          <Bar options={chartOptions} data={data} />
                        ) : chart_type === "bubble" ? (
                          <Bubble options={chartOptions} data={data} />
                        ) : (
                          <Pie
                            options={chartOptions}
                            data={data}
                          />
                        )}
                      </Box>
                    </Center>

                    <Center>
                      <HStack spacing={3}>
                        <Button
                          bgColor={"green.700"}
                          variant="solid"
                          onClick={() => {
                            chart_create(
                              dispatch,
                              chart_type,
                              chartOptions,
                              data,
                              user.name
                            );
                            navigate(`/charts/${user.name}`);
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          bgColor={"red.700"}
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
                  boxShadow={"2xl"}
                  shadow="dark-lg"
                  bg="gray.900"
                  rounded={"xl"}
                  mt="5"
                  height={RESPONSIVE_H}
                  width={RESPONSIVE_W}
                >
                  <Center>
                    <Heading mb={3} color={"orange.400"}>
                      Data Panel
                    </Heading>
                  </Center>
                  <Divider color="orange.300" orientation="horizontal" mb={2} />

                  <Nav variant="tabs" defaultActiveKey="0" className="mb-2">
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
                    {datasetTitles.length < 5 && (
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
                    )}
                  </Nav>
                  <Wrap justify={"center"}>
                    {main ? (
                      mainTitles.map((groupItem) => {
                        return (
                          <Form.Group className="mb-3">
                            <FormLabel color={"orange.300"}>
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
                          <FormLabel color={"orange.300"}>
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
                          <Center>
                            <FormLabel color={"orange.300"}>
                              {capitalize(chart_type)} Color
                            </FormLabel>
                          </Center>
                          <Center>
                            <HexColorPicker
                              style={{ width: "250px", height: "100px" }}
                              color={colors[currentDataset]}
                              onChange={(e) => changeColor(e)}
                            />
                          </Center>
                        </Form.Group>

                        <Center>
                          <Dropdown as={ButtonGroup}>
                            <OverlayTrigger
                              trigger="click"
                              placement="top"
                              overlay={pointForm}
                            >
                              <Button bgColor={"blue.600"}>
                                Add Datapoint
                              </Button>
                            </OverlayTrigger>
                            <Dropdown.Toggle
                              split
                              variant="primary"
                              id="dropdown-split-basic"
                            />
                            <Dropdown.Menu
                              style={{
                                backgroundColor: "#F6AD55",
                                padding: "3px",
                              }}
                            >
                              {chartData[currentDataset].data.length !== 0 ? (
                                chartData[currentDataset].data.map(
                                  (dataPoint, i) => {
                                    return (
                                      <HStack
                                        key={i}
                                        rounded="md"
                                        bgColor="orange.100"
                                        mb="1"
                                        boxShadow="md"
                                        justify={"center"}
                                      >
                                        <Text>
                                          ({dataPoint.x}, {dataPoint.y})
                                        </Text>
                                        <ImCross
                                          onClick={() => deleteDataPoint(i)}
                                          style={{
                                            color: "red",
                                            margin: "0 0 0 5",
                                            cursor: "",
                                          }}
                                        />
                                      </HStack>
                                    );
                                  }
                                )
                              ) : (
                                <Card.Text align="center">No Data</Card.Text>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        </Center>
                      </Container>
                    )}
                  </Wrap>
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
