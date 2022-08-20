import { ReactNode } from "react";
import {
  Stack,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

export default function About() {
  return (
    <Box
      m={'20'}
      p="5"
      boxShadow={"2xl"}
      shadow='dark-lg'
      bg="gray.900"
      rounded={"xl"}
      position={"relative"}
    >
      <Container maxW={"7xl"} position={"relative"}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Stack
            flex={1}
            color={"gray.400"}
            justify={{ lg: "center" }}
            py={{ base: 4, md: 10, xl: 15 }}
          >
            <Box mb={{ base: 8, md: 20 }}>
              <Text
                fontFamily={"heading"}
                fontWeight={700}
                textTransform={"uppercase"}
                mb={3}
                fontSize={"xl"}
                color={"gray.500"}
              >
                Innovation
              </Text>
              <Heading
                color={"white"}
                mb={5}
                fontSize={{ base: "3xl", md: "5xl" }}
              >
                Chart Creator Website
              </Heading>
              <Text fontSize={"xl"} color={"gray.400"}>
                Architecturex allows you to design and modify
                your charts in real time. The harmonius editing software enables
                you to fullfill your creative adventures in our comprehensive
                world of limitless data. You can also view other people's
                interesting creations through their unique profiles on this
                website!
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {stats.map((stat) => (
                <Box key={stat.title}>
                  <Text
                    fontFamily={"heading"}
                    fontSize={"3xl"}
                    color={"white"}
                    mb={3}
                  >
                    {stat.title}
                  </Text>
                  <Text fontSize={"xl"} color={"gray.400"}>
                    {stat.content}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

const StatsText = ({ children }) => (
  <Text as={"span"} fontWeight={700} color={"white"}>
    {children}
  </Text>
);

const stats = [
  {
    title: "Created By",
    content: (
      <>
        <StatsText>Alexander Budko</StatsText>, a University of Pennsylvania
        undegraduate student
      </>
    ),
  },
  {
    title: "Bar/Line/Bubble/Pie",
    content: (
      <>
        <StatsText>Charts</StatsText> can be easily and creatively designed
        using this free, open-source software
      </>
    ),
  },
  {
    title: "15+",
    content: (
      <>
        <StatsText>Features</StatsText> are present in the Architecturex
        Dashboard, which are all available to any authenticated user
      </>
    ),
  },
  {
    title: "Limitless",
    content: (
      <>
        <StatsText>Creativity</StatsText> can be expressed by designing charts
        within the website, from choosing unlimited colors, to adding unlimited
        data.
      </>
    ),
  },
];
