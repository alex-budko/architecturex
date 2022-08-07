import { FormLabel } from "react-bootstrap";

import {
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,
  NumberInputField,
  HStack,
} from "@chakra-ui/react";

export const BubbleR = () => {
  return (
    <HStack>
      <FormLabel
        color="orange.900"
        className="me-2"
        style={{ display: "inline" }}
      >
        R:
      </FormLabel>
      <NumberInput bgColor="gray.50">
        <NumberInputField name="r" type="number" placeholder="0" required />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  );
};