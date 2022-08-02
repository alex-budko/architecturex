import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

function EmailSent({ setShow, message, confirmEmail }) {
  const handleClose = () => setShow(false);

  return (
    <Center>
      <VStack
        bgColor={"green.800"}
        minH="250px"
        minW={"300px"}
        zIndex={5}
        rounded='3xl'
        shadow={'dark-lg'}

        p='10'
        position="absolute"
        top={"50%"}
      >
        <Heading>{message} Successful!</Heading>
        {confirmEmail && (
          <>
            <Divider />
            <Text>
              {" "}
              A confirmation email has been sent to your address, you may now
              close this window.
            </Text>
          </>
        )}
        <Button
          position={"absolute"}
          bottom="10"
          size="lg"
          bgColor="green.900"
          onClick={() => handleClose()}
        >
          Close
        </Button>
      </VStack>
    </Center>
  );
}

export default EmailSent;
