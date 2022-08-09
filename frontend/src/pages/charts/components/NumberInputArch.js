import { FormLabel } from "react-bootstrap";

import {
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,
  NumberInputField,
  HStack,
} from "@chakra-ui/react";
import { capitalize } from "../../../utils/capitalize";

export const NumberInputArch = ({name}) => {
  return (
    <HStack>
      <FormLabel
        color="orange.900"
        className="me-2"
        style={{ display: "inline" }}
      >
        {capitalize(name)}:
      </FormLabel>
      <NumberInput bgColor="gray.50">
        <NumberInputField name={name} type="number" placeholder="0" required />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  );
};
