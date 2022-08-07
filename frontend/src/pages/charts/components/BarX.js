import { FormLabel } from "react-bootstrap";

import { HStack, Input } from "@chakra-ui/react";

export const BarX = () => {
  return (
    <HStack>
      <FormLabel
        color="orange.900"
        className="me-2"
        style={{ display: "inline" }}
      >
        Name:
      </FormLabel>
      <Input
        bgColor="gray.50"
        name="x"
        type="text"
        placeholder="Name"
        required
      />
    </HStack>
  );
};
