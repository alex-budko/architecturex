import { FormLabel } from "react-bootstrap";

import {  NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, NumberInput, NumberInputField, HStack } from "@chakra-ui/react";

export const LinearY = () => {
  return (
    <HStack>
      <FormLabel
        color="orange.900"
        className={`me-10`}
        style={{ display: "inline" }}
      >
        Y:
      </FormLabel>
      <NumberInput>
        <NumberInputField
          bgColor="gray.50"
          name="y"
          type="number"
          placeholder="0"
          required
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  );
};
