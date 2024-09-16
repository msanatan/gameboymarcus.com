import {
  Box,
  Code,
  Heading,
  Image,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import path from "path";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, children }) => {
      if (href) {
        if (href.startsWith("/")) {
          return (
            <Link href={href}>
              <Text as="span" textDecoration="underline" color="#597AFF">
                {children}
              </Text>
            </Link>
          );
        }

        return (
          <Link href={href} target="_blank" rel="nofollow noopener noreferrer">
            <Text as="span" textDecoration="underline" color="#597AFF">
              {children}
            </Text>
          </Link>
        );
      }
    },
    blockquote: ({ children }) => (
      <Box
        as="blockquote"
        borderLeft="4px solid #00cdac"
        pl={4}
        py={2}
        my={[2, 4]}
        lineHeight={1.4}
        bg="#f5f5f5"
        fontStyle="italic"
        color="#212529"
      >
        {children}
      </Box>
    ),
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

      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    h1: ({ children }) => (
      <Heading
        as="h1"
        fontSize={[32, 48]} // Mobile: 32, Desktop: 48
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
        fontSize={[24, 32]} // Mobile: 24, Desktop: 32
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
        fontSize={[20, 28]} // Mobile: 20, Desktop: 28
        color="black"
        paddingY={[0.5, 1, 2]}
        fontFamily="pressStart2P"
      >
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading
        as="h4"
        fontSize={[18, 24]} // Mobile: 18, Desktop: 24
        color="black"
        paddingY={[0.5, 1, 2]}
        fontFamily="pressStart2P"
      >
        {children}
      </Heading>
    ),
    img: async ({ src = "", alt = "" }) => {
      return <Image src={src} alt={alt} objectFit="cover" />;
    },
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
    ...components,
  };
}
