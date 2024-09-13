"use client";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  chakra,
} from "@chakra-ui/react";

export default function Contact() {
  return (
    <Flex
      id="main"
      bg="black"
      w="full"
      grow={1}
      padding={[4, 8, 16]}
      justifyContent="center"
    >
      <chakra.form
        action="https://api.staticforms.xyz/submit"
        method="post"
        w={["full", "80%", "50%"]}
        padding={[2, 4, 8]}
      >
        <FormControl my={[2, 4, 8]} isRequired>
          <FormLabel fontFamily="arcadeGamer" color="#FFDE59" fontSize={18}>
            Name
          </FormLabel>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            fontFamily="pressStart2P"
            color="white"
            fontSize={18}
            size="xl"
            variant="flushed"
            my={[4, 8]}
          />
        </FormControl>

        <FormControl my={[2, 4, 8]} isRequired>
          <FormLabel fontFamily="arcadeGamer" color="#FFDE59" fontSize={18}>
            Email Address
          </FormLabel>
          <Input
            type="text"
            name="email"
            placeholder="Your Email"
            fontFamily="pressStart2P"
            color="white"
            fontSize={18}
            size={["md", "lg", "xl"]}
            variant="flushed"
            my={[2, 4, 8]}
          />
        </FormControl>

        <FormControl my={[2, 4, 8]} isRequired>
          <FormLabel fontFamily="arcadeGamer" color="#FFDE59" fontSize={18}>
            Message
          </FormLabel>
          <Textarea
            name="message"
            fontFamily="pressStart2P"
            color="white"
            fontSize={18}
            size={["md", "lg", "xl"]}
            variant="flushed"
            my={[2, 4, 8]}
          />
        </FormControl>

        <input type="text" name="honeypot" style={{ display: "none" }} />
        <input
          type="hidden"
          name="accessKey"
          value="230f5139-f971-49b9-ac39-12645d057e31"
        />
        <input
          type="hidden"
          name="subject"
          value="Contact us from - gameboymarcus.com"
        />
        <input type="hidden" name="replyTo" value="@" />
        <input
          type="hidden"
          name="redirectTo"
          value="https://gameboymarcus.com/contact/success"
        />

        <Button
          my={[2, 4, 8]}
          type="submit"
          variant="outline"
          color="white"
          _hover={{ color: "#FFDE59" }}
          fontFamily="pressStart2P"
        >
          Submit
        </Button>
      </chakra.form>
    </Flex>
  );
}
