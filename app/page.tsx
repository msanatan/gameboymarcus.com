"use client";
import Portfolio from "@/components/portfolio/portfolio";
import { Box, Flex, Center, SimpleGrid, chakra } from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
  return (
    <Box>
      {/* Main Section */}
      <Flex
        id="main"
        bg="#FFDE59"
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
              priority={true}
            />
          </Center>
          {/* Intro Section */}
          <Center>
            <Flex w={270} h={480} style={{ overflow: "hidden" }}>
              <chakra.iframe
                src="/games/plucky/index.html"
                w="100%"
                h="100%"
              ></chakra.iframe>
            </Flex>
          </Center>
        </SimpleGrid>
      </Flex>

      {/* Portfolio Section */}
      <Flex id="games" bg="black" w="full" padding={[2, 4, 8]}>
        <Portfolio />
      </Flex>
    </Box>
  );
}
