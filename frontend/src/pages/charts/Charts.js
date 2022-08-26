import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useParams } from "react-router";
import { charts_view } from "../../auth-reducers/AuthReducers";

import { Chart } from "react-chartjs-2";
import { Box, Button, Center, Heading } from "@chakra-ui/react";

function Charts() {
  const [charts, setCharts] = useState(null);

  const { name } = useParams();

  useEffect(() => {
    charts_view(name).then((res) => setCharts(res.data));
  }, [name]);

  return (
    <Center>
      <Box
        bgColor="gray.900"
        minW="400px"
        maxW="700px"
        p="5"
        my="20"
        shadow={"dark-lg"}
        rounded="lg"
      >
        <Box align="center">
          <Heading>
            <u>{name}'s Charts</u>
          </Heading>
          {charts &&
            charts.map((chart) => {
              return (
                <Center>
                  <Box
                    mt="4"
                    width={
                      chart.chartType !== "pie"
                        ? ["300px", "450px", "500px", "580px"]
                        : ["150px", "200px", "300px", "400px", "500px"]
                      }
                    bgColor="gray.50"
                    shadow={"dark-lg"}
                    rounded="lg"
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
              );
            })}

          <Button
            as={Link}
            to={`/profile/${name}`}
            variant="primary"
            _hover={{ color: "gray.300" }}
          >
            Go To Profile
          </Button>
        </Box>
      </Box>
    </Center>
  );
}

export default Charts;
