import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { Fragment } from "react";

function FormCreator({groups}, ...props) {
  return (
    <Container className="mt-5">
      <Row>
        <Col />
        <Col xs={6}>
          <Form onSubmit={props.onSubmit}>
            {Object.keys(groups).map((g, index) => {
              let group = groups[g]
              return (
                <Form.Group
                  key={index}
                  className="mb-4"
                  controlId={`formBasic${group.controlId}`}
                >
                  <FloatingLabel
                    label={`${group.label}`}
                  >
                    <Form.Control
                      isInvalid={group.isInvalid}
                      required
                      value={group.value}
                      // pattern={group.pattern}
                      onChange={(e) => props.changeInfo(e)}
                      name={`${group.name}`}
                      type={`${group.name}`}
                      placeholder={`Enter ${group.name}`}
                    />
                  </FloatingLabel>
                  {group.muted && (
                    <Form.Text className="text-muted">
                      {group.mutedText}
                    </Form.Text>
                  )}
                </Form.Group>
              );
            })}
            <div className="d-grid gap-2">
              <Button variant="primary" size="md" type="submit">
                <Fragment>{props.submit}</Fragment>
              </Button>
            </div> 
          </Form>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default FormCreator;
