import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useParams } from "react-router";
import { charts_view } from "../../auth-reducers/AuthReducers";

import { Line, Bar } from "react-chartjs-2";
import Container from "react-bootstrap/Container";
import { Box, Button, Heading } from "@chakra-ui/react";

function Charts() {
  const [charts, setCharts] = useState(null);

  const { name } = useParams();

  useEffect(() => {
    charts_view(name).then((res) => setCharts(res.data));
  }, [name]);

  return (
    <Box bgColor="gray.900" m="20" shadow={"dark-lg"} rounded='lg'>
      <Box align="center">
        <Heading>
          <u>{name}'s Charts</u>
        </Heading>
        {charts &&
          charts.map((chart) => {
            return (
              <Box mt='4' style={{ width: "600px" }} bgColor="gray.50" shadow={"dark-lg"} rounded='lg'>
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
            );
          })}
        <Button as={Link} to={`/profile/${name}`} variant="primary" _hover={{color: 'gray.300'}}>
          Go To Profile
        </Button>
      </Box>
    </Box>
  );
}

export default Charts;
