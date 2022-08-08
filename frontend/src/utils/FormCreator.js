import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { Link as ReactLink} from "react-router-dom";
import { Center, Button, Heading, Link } from "@chakra-ui/react";

function FormCreator(props) {
  const groups = props.groups;

  return (
    <Container className="mt-5">
      <Row>
        <Col />
        <Col xs={6}>
          <Center>
            <Heading _hover={{color: 'orange.600'}} mt={-2} mb={5}>{props.submit}</Heading>
          </Center>
          <Form onSubmit={props.onSubmit}>
            {Object.keys(groups).map((g, index) => {
              let group = groups[g];
              return (
                <Form.Group
                  key={index}
                  className="mb-4"
                  controlId={`formBasic${group.controlId}`}
                >
                  <FloatingLabel style={{color: "#1A365D !important"}} label={`${group.label}`}>
                    <Form.Control
                      style={{color: "white", backgroundColor: "#1A202C"}}
                      isInvalid={group.isInvalid}
                      required
                      value={group.value}
                      pattern={group.pattern}
                      onChange={(e) => {props.changeInfo(e)}}
                      name={`${group.name}`}
                      type={`${group.type}`}
                      placeholder={`Enter ${group.name}`}
                    />
                  </FloatingLabel>
                  {group.muted && (
                    <Form.Text style={{color: "white", fontSize: "1.7vh"}}>
                      {group.mutedText}
                    </Form.Text>
                  )}
                </Form.Group>
              );
            })}
            {props.login && (
              <Row>
                <Col>
                  <Form.Group className="mb-4" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember Me" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-4 text-end"
                    controlId="formBasicCheckbox"
                  >
                    <Link _hover={{color: 'orange.600'}} as={ReactLink} to="/password/reset/">Forgot Password</Link> 
                  </Form.Group>
                </Col>
              </Row>
            )}
            <div className="d-grid gap-2">
              <Button backgroundColor={'blue.600'} size="md" type="submit">
                {`${props.submit}`}
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
