import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useParams } from "react-router";
import { charts_view } from "../../auth-reducers/AuthReducers";

import { Line } from "react-chartjs-2";


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
        width: "90vw",
        height: "90vh",
        overflow: "scroll",
      }}
    >
      <Card.Body align="center">
        <Card.Title>Charts</Card.Title>
        <Row>
          {charts &&
            charts.map((chart) => {
              return (
                <Col>
                  <Line
                    style={{ width: "250px", height: "100px" }}
                    options={chart.options}
                    data={chart.data}
                    key={chart.id}
                  />
                </Col>
              );
            })}
        </Row>
        <Button as={Link} to={`/profile/${name}`} variant="primary">
          Go To Profile
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Charts;
