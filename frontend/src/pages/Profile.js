import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Heading,
  Center,
  Flex,
  Wrap,
  FormControl,
  WrapItem,
  Avatar,
  VStack,
  HStack,
} from "@chakra-ui/react";

import {
  charts_view,
  log_out,
  profile_update,
  profile_view,
} from "../auth-reducers/AuthReducers";
import { useParams } from "react-router-dom";
import { Chart } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    user: "",
    description: "",
    email: "",
    avatar: null,
  });

  const [charts, setCharts] = useState(null);

  const navigate = useNavigate();

  const [description, setDescription] = useState({
    description: "",
  });

  const user = useSelector((state) => state.user.user);

  const [updating, setUpdating] = useState(false);

  const { name } = useParams();

  useEffect(() => {
    profile_view(name).then((res) => setData(res.data));
    charts_view(name).then((res) => setCharts(res.data));
  }, [updating, name]);

  useEffect(() => {
    setDescription(data.description);
  }, [data]);

  const RESPONSIVE_H = ["450px", "500px", "580px"];

  const RESPONSIVE_W = ["300px", "450px", "580px", "660px", "600px"];

  return (
    <Center>
      <Flex>
        <Wrap spacing={6} spacingY={20} justify="center">
          <WrapItem>
            <Box
              p="15"
              height={RESPONSIVE_H}
              bg="teal.400"
              width={RESPONSIVE_W}
              bgColor={"blue.800"}
              rounded={"md"}
            >
              <Center>
                <Avatar
                  bgColor={"blue.600"}
                  size="2xl"
                  align="center"
                  name={name}
                />
              </Center>

              <Box align="center">
                <VStack>
                  <Heading color="orange.400" size="lg" mb={3}>
                    {data.user}
                  </Heading>
                </VStack>
                <FormControl
                  textAlign={"center"}
                  bg={"gray.300"}
                  style={{
                    color: "#1A365D",
                  }}
                  p="2"
                  resize={"none"}
                  minH={"200px"}
                  rounded={"md"}
                  value={description}
                  size="sm"
                  aria-label="Description"
                  as="textarea"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  disabled={!updating}
                  mb={3}
                />
                <HStack justify="center">
                  {user &&
                    name === user.name &&
                    (!updating ? (
                      <Button
                        onClick={() => setUpdating(!updating)}
                        colorScheme={"orange"}
                        color="blue.800"
                      >
                        Update
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setUpdating(!updating);
                          profile_update(data.user, data.email, description);
                        }}
                        colorScheme={"orange"}
                        color="blue.800"
                      >
                        Confirm
                      </Button>
                    ))}
                  <Center mt={"3"}>
                    {user && name === user.name && (
                      <Button
                        bgColor="red.600"
                        _hover={{ bgColor: "red.800" }}
                        onClick={() => {
                          log_out(dispatch);
                          navigate("/");
                        }}
                      >
                        Log Out
                      </Button>
                    )}
                  </Center>
                </HStack>
              </Box>
            </Box>
          </WrapItem>
          <WrapItem>
            <Box
              p="15"
              height={RESPONSIVE_H}
              bg="teal.400"
              width={RESPONSIVE_W}
              bgColor={"blue.800"}
              rounded={"md"}
              overflowY="scroll"
            >
              <Center>
                <Avatar
                  bgColor={"blue.600"}
                  size="2xl"
                  align="center"
                  src={require("../images/charts.png")}
                />
              </Center>
              <Center>
                <Heading color={"orange.400"} mb="2">
                  Charts
                </Heading>
              </Center>
              <Box p="2" minH={"200px"} rounded={"md"} bgColor={"gray.300"}>
                {charts &&
                  charts.map((chart, i) => {
                    return (
                      i < 2 && (
                        <Center>
                          <Box
                            p="1"
                            rounded={"2xl"}
                            width={
                              chart.chartType !== "pie"
                                ? ["100%", "100%", "90%", "480px"]
                                : ["50%", "60%", "70%", "350px"]
                            }
                            bgColor={"gray.50"}
                            mt="3"
                          >
                            <Chart
                              type={chart.chartType}
                              options={chart.options}
                              data={chart.data}
                              style={chart.style}
                              key={chart.id}
                            />
                          </Box>
                        </Center>
                      )
                    );
                  })}

                <Center>
                  <Button
                    mt="3"
                    as={Link}
                    to={`/charts/${name}`}
                    bgColor={"blue.800"}
                    _hover={{ bgColor: "blue.500", color: "orange.50" }}
                  >
                    View All
                  </Button>
                </Center>
              </Box>
            </Box>
          </WrapItem>
        </Wrap>
      </Flex>
    </Center>
  );
}

export default Profile;
