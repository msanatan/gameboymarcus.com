"use client";
import Portfolio from "@/components/portfolio/portfolio";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  Center,
  VStack,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
  return (
    <Box>
      {/* Main Section */}
      <Flex
        id="main"
        bg="#FFDE59"
        minH="50vh"
        w="full"
        padding={[2, 4, 8]}
        justifyContent="center"
      >
        <SimpleGrid columns={[1, 2]} spacing={[4, 8, 16]}>
          <Center>
            <Image
              src="/images/logo.png"
              width={512}
              height={512}
              alt="GameBoyMarcus logo"
            />
          </Center>
          {/* Intro Section */}
          <VStack padding={[2, 4, 8]}>
            <Text
              fontSize={["sm", "lg", "xl"]}
              color="black"
              fontFamily="pressStart2P"
              textAlign="left"
            >
              I&apos;m Marcus, a full stack game dev from Trinidad and Tobago!
            </Text>

            <List w="full" marginY={[2, 4, 8]} spacing={[2, 4, 8]}>
              <ListItem
                fontSize={["xs", "md"]}
                color="black"
                fontFamily="pressStart2P"
              >
                <ListIcon as={ChevronRightIcon} color="black" />I make games
                with Unity
              </ListItem>

              <ListItem
                fontSize={["xs", "md"]}
                color="black"
                fontFamily="pressStart2P"
              >
                <ListIcon as={ChevronRightIcon} color="black" />I develop
                services with Golang, Node.js (Express.js, NestJS), Python (AWS
                Chalice, Flask)
              </ListItem>

              <ListItem
                fontSize={["xs", "md"]}
                color="black"
                fontFamily="pressStart2P"
              >
                <ListIcon as={ChevronRightIcon} color="black" />I paint
                frontends with React.js
              </ListItem>

              <ListItem
                fontSize={["xs", "md"]}
                color="black"
                fontFamily="pressStart2P"
              >
                <ListIcon as={ChevronRightIcon} color="black" />I dabble in
                mobile apps with React Native
              </ListItem>
            </List>
          </VStack>
        </SimpleGrid>
      </Flex>

      {/* Portfolio Section */}
      <Flex id="games" bg="black" minH="50vh" w="full" padding={[2, 4, 8]}>
        <Portfolio />
      </Flex>
    </Box>
  );
}
