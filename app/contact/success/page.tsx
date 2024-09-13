import { Flex, Text } from "@chakra-ui/react";

export default function ContactSuccess() {
  return (
    <Flex
      id="main"
      bg="#FFDE59"
      w="full"
      padding={[4, 8, 16]}
      justifyContent="center"
      grow={1}
    >
      <Text fontFamily="pressStart2P" color="black">
        Thank you for submitting your email! Stay tuned for a reply.
      </Text>
    </Flex>
  );
}
