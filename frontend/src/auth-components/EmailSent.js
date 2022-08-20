import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { FiThumbsUp } from "react-icons/fi";

function EmailSent({ setShow, message, confirmEmail }) {
  const handleClose = () => setShow(false);

  return (
    <Center>
      <VStack
        bgColor={"blue.900"}
        minH="250px"
        minW={"300px"}
        zIndex={5}
        rounded="3xl"
        shadow={"dark-lg"}
        p="10"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <HStack>
          <Heading>{message} Successful! </Heading>
          <FiThumbsUp style={{ width: 50, height: 50 }} />
        </HStack>
        {confirmEmail && (
          <>
            <Divider />
            <Center>
              <Text>
                A confirmation email has been sent to your address, you may now
                close this window.
              </Text>
            </Center>
          </>
        )}
        <Button
          position={"absolute"}
          bottom="10"
          size="lg"
          bgColor="blue.600"
          onClick={() => handleClose()}
        >
          Close
        </Button>
      </VStack>
    </Center>
  );
}

export default EmailSent;
