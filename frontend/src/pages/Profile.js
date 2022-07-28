import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Center,
  Flex,
  Wrap,
  FormControl,
  WrapItem,
  Avatar,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";

import {
  charts_view,
  profile_update,
  profile_view,
} from "../auth-reducers/AuthReducers";
import { useParams } from "react-router-dom";

import { BiUpload } from "react-icons/bi";

import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import { Line, Bar } from "react-chartjs-2";

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
  return (
    <Center>
      <Flex>
        <Wrap spacing={6} justify="center">
          <WrapItem>
            <Box
              p="15"
              height={[
                "300px", // 48em-62em
                "450px", // 62em+
                "500px", // 48em-62em
                "580px", // 62em+
              ]}
              bg="teal.400"
              width={[
                "500px", // 48em-62em
                "560px", // 62em+
                "660px", // 48em-62em
                "600px", // 62em+
              ]}
              bgColor={"blue.800"}
              rounded={"md"}
            >
              <Center>
                <Avatar
                  size="2xl"
                  align="center"
                  src={require("../images/pfp.png")}
                />
                <Uploady
                  style={{ cursor: "pointer", width: "30px" }}
                  destination={{ url: "/C:/build/static/media/avatars/" }}
                >
                  <UploadButton onClick={(e) => console.log(e)}>
                    <BiUpload />
                  </UploadButton>
                </Uploady>
              </Center>

              <Box align="center">
                <VStack>
                  <Heading color="orange.400" size="lg" mb={3}>
                    {data.user}
                  </Heading>
                </VStack>

                <FormControl
                  bg={"orange.200"}
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
                {!updating ? (
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
                )}
              </Box>
            </Box>
          </WrapItem>
          <WrapItem>
            <Box
              p="15"
              height={[
                "300px", // 48em-62em
                "450px", // 62em+
                "500px", // 48em-62em
                "580px", // 62em+
              ]}
              bg="teal.400"
              width={[
                "500px", // 48em-62em
                "560px", // 62em+
                "660px", // 48em-62em
                "600px", // 62em+
              ]}
              bgColor={"blue.800"}
              rounded={"md"}
              overflowY="scroll"
            >
              <Center>
                <Heading color={"orange.400"} mb="2">
                  Charts
                </Heading>
              </Center>
              <Box p="2" rounded={"md"} bgColor={"orange.200"}>
                {charts &&
                  charts.map((chart, i) => {
                    return (
                      i < 2 && (
                        <Center>
                          <Box
                            p="1"
                            rounded={"md"}
                            width={[
                              "330px", // 48em-62em
                              "360px", // 62em+
                              "400px", // 48em-62em
                              "480px", // 62em+
                            ]}
                            bgColor={"gray.50"}
                            mb="1"
                          >
                            {chart.chartType === "L" ? (
                              <Line
                                options={chart.options}
                                data={chart.data}
                                key={chart.id}
                              />
                            ) : (
                              <Bar
                                options={chart.options}
                                data={chart.data}
                                key={chart.id}
                              />
                            )}
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
