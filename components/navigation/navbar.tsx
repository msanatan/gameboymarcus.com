"use client";
import {
  Link as ChakraLink,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";

function NavbarButton({
  url,
  name,
  onClick,
}: {
  url: string;
  name: string;
  onClick?: () => void;
}) {
  return (
    <Button
      as={Link}
      href={url}
      size={["md", "lg"]}
      color="#FFDE59"
      variant="none"
      fontFamily="pressStart2P"
      _hover={{ textDecoration: "underline" }}
      onClick={onClick}
    >
      {name}
    </Button>
  );
}

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog/page/1" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <Flex
        as="nav"
        position="sticky"
        top="0"
        zIndex="100"
        bg="black"
        px={[2, 4]}
        py={[2, 4]}
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Logo */}
        <Center py={[2, 4]} paddingX={[4, 8]}>
          <Link href="/" passHref legacyBehavior>
            <ChakraLink textDecor="none">
              <Heading
                as="h1"
                size="xl"
                color="#FFDE59"
                fontFamily="arcadeGamer"
              >
                GBM
              </Heading>
            </ChakraLink>
          </Link>
        </Center>

        {/* Desktop Menu */}
        <HStack
          paddingX={[4, 8]}
          spacing={[1, 8]}
          display={{ base: "none", md: "flex" }}
        >
          {navLinks.map((link) => (
            <NavbarButton
              key={link.name}
              url={link.href}
              name={link.name}
              onClick={onClose}
            />
          ))}
        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          size="xl"
          color="#FFDE59"
          bg="black"
          onClick={onOpen}
          display={{ base: "flex", md: "none" }}
          paddingX={[4, 8]}
        />
      </Flex>

      {/* Mobile Drawer Menu */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="black" color="#FFDE59">
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing={4} mt={10}>
              {navLinks.map((link) => (
                <NavbarButton
                  key={link.name}
                  url={link.href}
                  name={link.name}
                  onClick={onClose}
                />
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
