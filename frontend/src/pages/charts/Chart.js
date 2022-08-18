//chart.js imports
import { Chart as ChartJS } from "react-chartjs-2";
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
  VStack,
} from "@chakra-ui/react";

//components
import { capitalize } from "../../utils/capitalize";

import Li from "./datapointFunc/Li";
import Ba from "./datapointFunc/Ba";
import Bu from "./datapointFunc/Bu";
import Pi from "./datapointFunc/Pi";
import { NumberInputArch } from "./components/NumberInputArch";

// options
import { datasetOptions, mainOptions } from "./options/options";

function Chart() {
  const dispatch = useDispatch();

  const { chartType } = useParams();

  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const [started, setStarted] = useState(false);
  const [currentDataset, setCurrentDataset] = useState(0);
  const [main, setMain] = useState(false);
  const [chartLabels, setChartLabels] = useState([]);

  //dataset data
  const [chartData, setChartData] = useState([]);

  const [pointColor, changePointColor] = useState("#aabbcc");

  //chart options
  const [chartOptions, setChartOptions] = useState([]);

  //chart style
  const [chartStyle, setChartStyle] = useState({});

  //chart titles
  const [datasetTitles, setDatasetTitles] = useState(["Dataset"]);

  const [chartTitle, setChartTitle] = useState(
    `My ${capitalize(chartType)} Chart`
  );

  const basicAxisTitles = {
    x: "X-Axis",
    y: "Y-Axis",
  };

  const [axisTitles, setAxisTitles] = useState(basicAxisTitles);

  //basic chart options
  let BCO = {
    radius: 0,
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
  let BCD = {
    label: "Dataset",
    data: [],
    fill: false,
    borderDash: [0, 0],
    borderColor: [],
    backgroundColor: [],
    tension: 0,
  };

  const BCD_ = { ...BCD };
  const BCO_ = { ...BCO };

  //chart titles
  const mainTitles = {
    line: [
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
    ],
    bar: [
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
    ],
    bubble: [
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
    ],
    pie: [
      {
        title: "Chart",
        name: "chartTitle",
        value: chartTitle,
      },
    ],
  };

  useEffect(() => {
    if (started) {
      setStarted(false);
    }
  }, [chartType]);

  useEffect(() => {
    if (!started) {
      setCurrentDataset(0);

      setChartTitle(`My ${capitalize(chartType)} Chart`);

      setAxisTitles(basicAxisTitles);

      setDatasetTitles(["Dataset"]);

      BCD = { ...BCD_ };
      BCO = { ...BCO_ };

      setChartLabels([]);

      setChartStyle({})

      setChartOptions(BCO[chartType]);

      setChartData([BCD]);

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

  //change chart titles in real-time
  useEffect(() => {
    if (started) {
      setChartOptions(BCO[chartType]);
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
        <Form onSubmit={(e) => ADD_FUNCTIONS[chartType](e)}>
          <Wrap spacingY={"3"}>
            {chartType === "line" ? (
              <Li />
            ) : chartType === "bar" ? (
              <>
                <Ba />
                <HexColorPicker
                  color={pointColor}
                  onChange={(e) => changePointColor(e)}
                  style={{ width: "250px", height: "100px" }}
                />
              </>
            ) : chartType === "bubble" ? (
              <>
                <Bu />
              </>
            ) : (
              <>
                <Pi />
                <HexColorPicker
                  color={pointColor}
                  onChange={(e) => changePointColor(e)}
                  style={{ width: "250px", height: "100px" }}
                />
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

  const data = {
    labels: chartLabels,
    datasets: chartData,
  };

  const addLinePoint = (e) => {
    e.preventDefault();
    let newChartData = [...chartData];

    newChartData[currentDataset]["data"].push({
      x: e.target[0].value,
      y: e.target[1].value,
    });

    setChartData(newChartData);
  };

  const addBarPoint = (e) => {
    e.preventDefault();
    let newChartData = [...chartData];

    newChartData[currentDataset]["data"].push({
      x: e.target[0].value,
      y: e.target[1].value,
    });

    newChartData[currentDataset]["backgroundColor"].push(pointColor);
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

    const name = e.target[0].value;
    const count = e.target[1].value;

    newChartData[currentDataset]["data"].push(count);
    newChartData[currentDataset]["backgroundColor"].push(pointColor);

    setChartLabels([...chartLabels, name]);
    setChartData(newChartData);
  };

  const ADD_FUNCTIONS = {
    bar: addBarPoint,
    line: addLinePoint,
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
    setChartOptions(BCO[chartType]);
  };

  const addDataset = () => {
    let newDatasetTitles = [...datasetTitles];
    newDatasetTitles.push("Dataset");
    setDatasetTitles(newDatasetTitles);

    let newChartData = [...chartData];
    newChartData.push(BCD);
    setChartData(newChartData);
  };

  const changeDatasetNum = (e) => {
    setCurrentDataset(e.target.name);
  };

  const datasetChange = (e, optionNames) => {
    let newChartData = [...chartData];
    for (let optionName of optionNames) {
      newChartData[currentDataset][optionName] = e;
    }
    setChartData(newChartData);
  };

  const mainChange = (e, optionNames) => {
    let newChartStyle = {...chartStyle}
    for (let optionName of optionNames) {
      newChartStyle[optionName] = e;
    }
    setChartStyle(newChartStyle);
  };

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
                  overflow="auto"
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
                      {capitalize(chartType)} Chart
                    </Heading>
                  </Center>
                  <Divider color="orange.300" orientation="horizontal" />

                  <Container>
                    <Center>
                      <Box
                        rounded={"md"}
                        width={
                          //pie chart is square, whereas other charts are rectangles
                          chartType !== "pie"
                            ? ["100%", "100%", "90%", "660px", "600px"]
                            : ["90%", "95%", "90%", "350px", "400px"]
                        }
                        bgColor="gray.100"
                        mt={2}
                        mb={2}
                      >
                        <ChartJS
                          style={chartStyle}
                          options={chartOptions}
                          data={data}
                          type={chartType}
                        />
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
                              chartType,
                              chartOptions,
                              chartStyle,
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
                  overflow="auto"
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

                  <Nav variant="tabs" defaultActiveKey="main" className="mb-2">
                    <Nav.Link
                      className="me-1"
                      style={{
                        borderWidth: "3px",
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
                            if (typeof e.target.name !== "undefined") {
                              setMain(false);
                              changeDatasetNum(e);
                            }
                          }}
                        >
                          <Nav.Link
                            className="me-1"
                            style={{
                              color: "#171923",
                              backgroundColor: "#FBD38D",
                              fontWeight: "bold",
                              borderWidth: "3px",
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
                            borderWidth: "3px",
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
                      <Wrap justify={"center"}>
                        {mainTitles[chartType].map((groupItem) => {
                          return (
                            <Wrap justify={"center"} spacing="3">
                              <Form.Group className="mb-3">
                                <Center>
                                  <FormLabel color={"orange.300"}>
                                    {groupItem.title} Title
                                  </FormLabel>
                                </Center>

                                <Form.Control
                                  onChange={(e) => changeTitle(e)}
                                  type="text"
                                  name={groupItem.name}
                                  value={groupItem.value}
                                />
                              </Form.Group>
                            </Wrap>
                          );
                        })}
                        <VStack
                          bgColor={"gray.800"}
                          style={{ marginTop: "25cdpx" }}
                          p="3"
                          rounded={"xl"}
                          minW="90%"
                        >
                          <Text textShadow={"dark-lg"} fontSize={"xl"}>
                            Main Options
                          </Text>
                          <Divider />
                          <Wrap justify="center" spacing={"5"}>
                            {mainOptions.map((option, k) => {
                              return (
                                <VStack key={k * 99 + 99}>
                                  <Text>{option["name"]}</Text>
                                  {option["type"] === "color" ? (
                                    <HexColorPicker
                                      style={{
                                        width: "250px",
                                        height: "100px",
                                      }}
                                      onChange={(e) => {
                                        mainChange(e, option["optionName"]);
                                      }}
                                    />
                                  ) : option["type"] === "number" ? (
                                    <NumberInputArch
                                      optionName={option["optionName"]}
                                      onChange={mainChange}
                                    />
                                  ) : (
                                    <Text>Invalid Type</Text>
                                  )}
                                </VStack>
                              );
                            })}
                          </Wrap>
                        </VStack>
                      </Wrap>
                    ) : (
                      <VStack>
                        <HStack>
                          <Form.Group className="mb-1">
                            <Center>
                              <FormLabel color={"orange.300"}>
                                Dataset Title
                              </FormLabel>
                            </Center>

                            <Form.Control
                              onChange={(e) => changeTitle(e)}
                              type="text"
                              name="title"
                              value={datasetTitles[currentDataset]}
                            />
                          </Form.Group>
                          <Center>
                            <Dropdown
                              as={ButtonGroup}
                              style={{ marginTop: "30px" }}
                            >
                              <OverlayTrigger
                                trigger="click"
                                placement="bottom"
                                overlay={pointForm}
                              >
                                <Button rounded="2" bgColor={"blue.600"}>
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
                        </HStack>

                        <Wrap
                          justify="center"
                          bgColor={"gray.800"}
                          style={{ marginTop: "25px" }}
                          p="3"
                          rounded={"xl"}
                          minW="100%"
                          spacing={"5"}
                        >
                          <Text textShadow={"dark-lg"} fontSize={"xl"}>
                            Dataset Options
                          </Text>
                          <Divider />
                          {datasetOptions[chartType].map((option, k) => {
                            return (
                              <VStack key={k * 99 + 99}>
                                <Text>{option["name"]}</Text>
                                {option["type"] === "color" ? (
                                  <HexColorPicker
                                    style={{ width: "250px", height: "100px" }}
                                    onChange={(e) => {
                                      datasetChange(e, option["optionName"]);
                                    }}
                                  />
                                ) : option["type"] === "number" ? (
                                  <NumberInputArch
                                    optionName={option["optionName"]}
                                    onChange={datasetChange}
                                  />
                                ) : (
                                  <Text>Invalid Type</Text>
                                )}
                              </VStack>
                            );
                          })}
                        </Wrap>
                      </VStack>
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
