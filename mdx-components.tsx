import { Heading, List, ListItem, Text } from "@chakra-ui/react";
import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <Heading
        as="h1"
        fontSize={["md", "lg", "x-large"]}
        color="black"
        paddingY={[1, 2, 3]}
        fontFamily="pressStart2P"
      >
        {children}
      </Heading>
    ),
    h2: ({ children }) => (
      <Heading
        as="h2"
        fontSize={["sm", "md"]}
        color="black"
        paddingY={[1, 2, 3]}
        fontFamily="pressStart2P"
      >
        {children}
      </Heading>
    ),
    p: ({ children }) => (
      <Text
        as="p"
        fontSize={["xs", "sm"]}
        color="black"
        paddingY={[1, 2, 3]}
        fontFamily="pressStart2P"
      >
        {children}
      </Text>
    ),
    ul: ({ children }) => (
      <List as="ul" w="full" marginY={[1, 2, 4]} spacing={[1, 2, 4]}>
        {children}
      </List>
    ),
    li: ({ children }) => (
      <ListItem
        as="li"
        fontSize={["xs", "sm"]}
        color="black"
        fontFamily="pressStart2P"
        paddingLeft={[1, 2, 4]}
      >
        {`> ${children}`}
      </ListItem>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        {...(props as ImageProps)}
      />
    ),
    ...components,
  };
}
