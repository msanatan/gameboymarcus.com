"use client";
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
        <Heading as="h1" size="xl" color="#FFDE59" fontFamily="arcadeGamer">
          GBM
        </Heading>
      </Center>
      <HStack spacing={[1, 8]}>
        <Button
          size={["sm", "lg"]}
          color="#FFDE59"
          variant="none"
          fontFamily="pressStart2P"
        >
          Blog
        </Button>
        <Button
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
