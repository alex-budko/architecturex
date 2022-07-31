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

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

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

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.user.user);

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
        bg: useColorModeValue("gray.600", "gray.700"),
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
              {user && (
                <>
                  <MenuDivider />
                  <MenuItem
                    _hover={{ color: "white" }}
                    as={ReactLink}
                    to={`/charts/${user.name}`}
                  >
                    View Charts
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        </Flex>
      )}
    </Link>
  );

  return (
    <>
      <Box bg={useColorModeValue("gray.500", "gray.900")} px={4}>
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
          {user ? (
            <Flex alignItems={"center"}>
              <Avatar
                size={"md"}
                _hover={{color: 'white'}}
                cursor="pointer"
                name={user.name}
                as={ReactLink}
                to={`/profile/${user.name}`}
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
              {!user &&
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
