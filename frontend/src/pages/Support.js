import {
  Flex,
  Stack,
  Heading,
  Text,
  Icon,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { BsPaypal } from "react-icons/bs";

export default function Support() {
  return (
    <Flex
      minH={"90vh"}
      align={"center"}
      justify={"center"}
      py={12}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        boxShadow={"2xl"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        p={10}
        spacing={8}
        align={"center"}
      >
        <Icon _hover={{ cursor: "pointer" }} as={BsPaypal} w={24} h={24} />
        <Stack align={"center"} spacing={2}>
          <Heading
            textTransform={"uppercase"}
            fontSize={"3xl"}
            color={useColorModeValue("gray.800", "gray.200")}
          >
            Support
          </Heading>
          <VStack>
            <Text fontSize={"lg"} color={"gray.500"}>
              By cliking on the PayPal icon, you can support this website!{" "}
            </Text>
            <Text fontSize={"lg"} color={"gray.500"}>
              It would mean the WORLD to me!
            </Text>
          </VStack>
        </Stack>
      </Stack>
    </Flex>
  );
}
