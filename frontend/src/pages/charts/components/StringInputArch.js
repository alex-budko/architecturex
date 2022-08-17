import { FormLabel } from "react-bootstrap";

import { HStack, Input } from "@chakra-ui/react";
import { capitalize } from "../../../utils/capitalize";

export const StringInputArch = ({name}) => {
  return (
    <HStack>
      <FormLabel
        color="orange.900"
        className="me-2"
        style={{ display: "inline" }}
      >
        {capitalize(name)}:
      </FormLabel>
      <Input
        _placeholder={{color:'blackAlpha.600'}}
        bgColor="gray.50"
        name={name}
        type="text"
        placeholder={capitalize(name)}
        required
      />
    </HStack>
  );
};
