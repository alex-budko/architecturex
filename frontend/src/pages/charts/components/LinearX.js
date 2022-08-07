import { FormLabel } from "react-bootstrap";

import {
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,
  NumberInputField,
  HStack,
} from "@chakra-ui/react";

export const LinearX = () => {
  return (
    <HStack>
      <FormLabel
        color="orange.900"
        className="me-2"
        style={{ display: "inline" }}
      >
        X:
      </FormLabel>
      <NumberInput bgColor="gray.50">
        <NumberInputField name="x" type="number" placeholder="0" required />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  );
};
