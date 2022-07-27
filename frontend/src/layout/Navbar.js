import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Link,
  Heading,
} from "@chakra-ui/react";

import { Link as ReactLink } from "react-router-dom";
import AuthenticatedStatus from "../auth-components/AuthenticatedStatus";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useEffect } from "react";

const Links = [
  {
    name: "About",
    href: "about",
    kidsExist: false,
  },
  {
    name: "Contact",
    href: "contact",
    kidsExist: false,
  },
  {
    name: "Support",
    href: "support",
    kidsExist: false,
  },
  {
    name: "Charts",
    href: "",
    kidsExist: true,
  },
];

const Sign_Links = [
  {
    name: "Log In",
    href: "login",
    kidsExist: false,
  },
  {
    name: "Sign Up",
    href: "signup",
    kidsExist: false,
  },
];

const NavLink = ({ href, name, kidsExist, color = "white" }) => (
  <Link
    px={2}
    as={ReactLink}
    py={1}
    rounded={"md"}
    color={color}
    _hover={{
      textDecoration: "none",
      color: "white",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    to={href}
    onClick={(e) => {
      if (href === "") {
        e.preventDefault();
      }
    }}
  >
    {!kidsExist && name}
    {kidsExist && (
      <Flex alignItems={"center"}>
        <Menu>
          <MenuButton rounded={"full"} cursor={"pointer"} minW={0}>
            {name}
          </MenuButton>
          <MenuList>
            <MenuItem
              _hover={{ color: "white" }}
              as={ReactLink}
              to="/chart/line"
            >
              Line Chart
            </MenuItem>
            <MenuItem
              _hover={{ color: "white" }}
              as={ReactLink}
              to="/chart/bar"
            >
              Bar Chart
            </MenuItem>
            <MenuDivider />
            <MenuItem _hover={{ color: "white" }} as={ReactLink} to="/charts">
              View Charts
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    )}
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let authenticated = false;
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={12} alignItems={"center"}>
            <Heading
              cursor={"pointer"}
              as={ReactLink}
              to=""
              _hover={{ color: "orange.500" }}
              mt={-2}
            >
              Architecturex
            </Heading>
            <HStack
              as={"nav"}
              spacing={8}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link, i) => (
                <NavLink
                  href={link.href}
                  name={link.name}
                  kidsExist={link.kidsExist}
                  key={i * 324 + 12}
                />
              ))}
            </HStack>
          </HStack>
          {authenticated ? (
            <Flex alignItems={"center"}>
              <Avatar
                size={"sm"}
                cursor="pointer"
                as={ReactLink}
                to={"/profile"}
                src={
                  "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                }
              />
            </Flex>
          ) : (
            <HStack
              as={"nav"}
              spacing={8}
              display={{ base: "none", md: "flex" }}
            >
              {Sign_Links.map((link, i) => (
                <NavLink
                  color={"blue.200"}
                  href={link.href}
                  name={link.name}
                  kidsExist={link.kidsExist}
                  key={i * 324 + 12}
                />
              ))}
            </HStack>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link, i) => (
                <NavLink
                  href={link.href}
                  name={link.name}
                  kidsExist={link.kidsExist}
                  key={i * 213 + 32}
                />
              ))}
              {!authenticated &&
                Sign_Links.map((link, i) => (
                  <NavLink
                    color={"blue.200"}
                    href={link.href}
                    name={link.name}
                    kidsExist={link.kidsExist}
                    key={i * 324 + 12}
                  />
                ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
