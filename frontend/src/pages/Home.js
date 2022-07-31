import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {

  const user = useSelector((state) => state.user.user);

  return (
    <Container maxW={"5xl"} bg='gray.900' mt={'5'} minH='500px' rounded={'lg'} shadow='dark-lg'>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 4, md: 6 }}
        py={{ base: 10, md: 20 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Design charts with{" "}
          <Text as={"span"} color={"orange.400"}>
            Architecturex
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          With just a couple of simple clicks, you can use this free open-source
          website to design any chart that satisfies your needs. With a
          welcoming user-friendly UI, the Data Panel will enable your
          creativity. Start designing today!
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            rounded={"full"}
            px={6}
            as={Link}
            to={`${!user ? '/login' : '/chart/line'}`}
            colorScheme={"orange"}
            bg={"orange.400"}
            _hover={{ bg: "orange.500", color: 'white'}}
          >
            Get started
          </Button>
          <Button rounded={"full"} as={Link} to="/about" px={6} _hover={{bg: 'gray.200', color: 'black'}}
>
            Learn more
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

