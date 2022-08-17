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

export const NumberInputArch = ({
  name = null,
  onChange = null,
  optionName = null,
}) => {
  return (
    <HStack>
      {name && (
        <FormLabel
          color="orange.900"
          className="me-2"
          style={{ display: "inline" }}
        >
          {capitalize(name)}:
        </FormLabel>
      )}
      <NumberInput
        bgColor="gray.50"
        rounded={"3xl"}
        onChange={onChange ? (e) => onChange(+e, optionName) : null}
      >
        <NumberInputField
          name={name}
          _placeholder={{color:'blackAlpha.600'}}
          placeholder='1'
          type="number"
          color="black"
          defaultValue={1}
          required
        />
        <NumberInputStepper bgColor="blue.600" rounded="3xl">
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  );
};
