import {
  Box,
  Center,
  Divider,
  Heading,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Bar, Bubble, Line, Pie } from "react-chartjs-2";
import { all_charts_view } from "../auth-reducers/AuthReducers";
import { Link } from "react-router-dom";

function Trending() {
  const [charts, setCharts] = useState(null);

  useEffect(() => {
    all_charts_view().then((res) => {
      setCharts(res.data);
    });
  }, []);
  return (
    <Center>
      <Box bgColor="gray.900" p="5" my="20" shadow={"dark-lg"} rounded="lg">
        <VStack>
          <Heading>Trending</Heading>
          <Divider />
        </VStack>
        <Wrap justify="center" p="30">
          {charts &&
            charts.map((chart, i) => {
              if (i > 10) return;
              return (
                <Center>
                  <WrapItem
                    mt="4"
                    p="5"
                    bgColor={"gray.800"}
                    shadow={"dark-lg"}
                    rounded="3xl"
                  >
                    <VStack>
                      <Text fontSize={"lg"} fontWeight="bold">
                        Made By{" "}
                        <u>
                          <Text
                            _hover={{ color: "orange.700" }}
                            color="orange.500"
                            as={Link}
                            to={`/profile/${chart.user}`}
                          >
                            {chart.user}
                          </Text>
                        </u>{" "}
                      </Text>
                      <Box
                        rounded="3xl"
                        width={
                          chart.chartType !== "pie"
                            ? ["300px", "450px", "500px", "580px"]
                            : ["50%", "60%", "70%", "400px", "500px"]
                        }
                        bgColor="gray.50"
                      >
                        {chart.chartType === "line" ? (
                          <Line
                            options={chart.options}
                            data={chart.data}
                            key={chart.id}
                          />
                        ) : chart.chartType === "bar" ? (
                          <Bar
                            options={chart.options}
                            data={chart.data}
                            key={chart.id}
                          />
                        ) : chart.chartType === "bubble" ? (
                          <Bubble
                            options={chart.options}
                            data={chart.data}
                            key={chart.id}
                          />
                        ) : (
                          <Pie
                            options={chart.options}
                            data={chart.data}
                            key={chart.id}
                          />
                        )}
                      </Box>
                    </VStack>
                  </WrapItem>
                </Center>
              );
            })}
        </Wrap>
      </Box>
    </Center>
  );
}

export default Trending;
