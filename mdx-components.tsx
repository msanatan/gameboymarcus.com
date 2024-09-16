import {
  Code,
  Heading,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";

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
    h3: ({ children }) => (
      <Heading
        as="h3"
        fontSize={["sm", "md"]}
        color="black"
        paddingY={[0.5, 1, 2]}
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
      <UnorderedList
        w="full"
        marginY={[1, 2, 4]}
        spacing={[1, 2, 4]}
        listStylePosition="inside"
      >
        {children}
      </UnorderedList>
    ),
    ol: ({ children }) => (
      <OrderedList
        w="full"
        marginY={[1, 2, 4]}
        spacing={[1, 2, 4]}
        listStylePosition="inside"
      >
        {children}
      </OrderedList>
    ),
    li: ({ children }) => (
      <ListItem
        as="li"
        fontSize={["xs", "sm"]}
        color="black"
        fontFamily="pressStart2P"
        paddingLeft={[1, 2, 4]}
      >
        {children}
      </ListItem>
    ),
    a: ({ href, children }) => {
      if (href) {
        if (href.startsWith("/")) {
          return (
            <Link href={href}>
              <Text as="span" textDecoration="underline">
                {children}
              </Text>
            </Link>
          );
        }

        return (
          <Link href={href} target="_blank" rel="nofollow noopener noreferrer">
            <Text as="span" textDecoration="underline">
              {children}
            </Text>
          </Link>
        );
      }
    },
    code: ({ children, className, ...props }) => {
      const isInline = !className;

      if (isInline) {
        return (
          <Code
            backgroundColor="black"
            borderRadius={["lg"]}
            fontSize={["xs", "sm"]}
            color="#79c0ff"
            paddingX={[1, 2, 3]}
            paddingY={1}
            fontFamily="pressStart2P"
            {...props}
          >
            {children}
          </Code>
        );
      }

      // Let rehypeHighlight handle the other, larger code blocks
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    ...components,
  };
}
