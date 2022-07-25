import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useParams } from "react-router";
import { charts_view } from "../../auth-reducers/AuthReducers";

import { Line, Bar } from "react-chartjs-2";
import Container from "react-bootstrap/Container";


function Charts() {
  const [charts, setCharts] = useState(null);

  const { name } = useParams();

  useEffect(() => {
    charts_view(name).then((res) => setCharts(res.data));
  }, [name]);

  return (
    <Card
      style={{
        marginTop: "10px",
        width: "100vw",
        height: "90vh",
        overflowY: "scroll",
      }}
    >
      <Card.Body align="center">
        <Card.Title><u>{name}'s Charts</u></Card.Title>
          {charts &&
            charts.map((chart) => {
              return (
                <Container style={{ width: "600px" }}>
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
                </Container>
              );
            })}
        <Button as={Link} to={`/profile/${name}`} variant="primary">
          Go To Profile
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Charts;
