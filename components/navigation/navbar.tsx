"use client";
import { Link } from "@chakra-ui/next-js";
import { Button, Center, Flex, Heading, HStack } from "@chakra-ui/react";

export default function NavBar() {
  return (
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
      <Center py={[2, 4]} paddingX={[2, 4]}>
        <Link href="/" textDecor="none">
          <Heading as="h1" size="xl" color="#FFDE59" fontFamily="arcadeGamer">
            GBM
          </Heading>
        </Link>
      </Center>
      <HStack spacing={[1, 8]}>
        <Button
          as={Link}
          href="/about"
          size={["sm", "lg"]}
          color="#FFDE59"
          variant="none"
          fontFamily="pressStart2P"
        >
          About
        </Button>
        <Button
          as={Link}
          href="/blog/page/1"
          size={["sm", "lg"]}
          color="#FFDE59"
          variant="none"
          fontFamily="pressStart2P"
        >
          Blog
        </Button>
        <Button
          as={Link}
          href="/contact"
          size={["sm", "lg"]}
          color="#FFDE59"
          variant="none"
          fontFamily="pressStart2P"
        >
          Contact
        </Button>
      </HStack>
    </Flex>
  );
}
