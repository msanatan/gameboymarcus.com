import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Center,
  Flex,
  HStack,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { getAllPosts, getPathFromDate } from "../../../../lib/posts";

const POSTS_PER_PAGE = 10;

interface BlogPageProps {
  params: {
    page: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const params = Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
  return params;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const page = parseInt(params.page, 10);

  if (isNaN(page) || page < 1) {
    notFound();
  }

  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  if (page > totalPages && totalPages !== 0) {
    notFound();
  }

  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return (
    <Flex id="main" bg="black" w="full" grow={1} padding={[4, 8, 16]}>
      <Center w="full">
        <VStack w="full">
          <Center>
            <List as="ul" w="full" marginY={[1, 2, 4]} spacing={[2, 4, 8]}>
              {paginatedPosts.map((post) => (
                <ListItem key={post.slug}>
                  <Link
                    href={`/blog/${getPathFromDate(post.date)}/${post.slug}`}
                  >
                    <Text
                      fontSize={["sm", "md", "lg"]}
                      color="#FFDE59"
                      fontFamily="pressStart2P"
                      textDecoration="underline"
                      _hover={{ textDecoration: "underline" }}
                    >
                      {post.title}
                    </Text>
                  </Link>
                  <Text
                    fontSize={["xs", "sm"]}
                    color="white"
                    fontFamily="pressStart2P"
                  >
                    {new Date(post.date).toLocaleDateString()}
                  </Text>
                </ListItem>
              ))}
            </List>
          </Center>

          <HStack spacing={[4, 8]}>
            {page > 1 ? (
              <Link href={`/blog/page/${page - 1}`}>
                <Button
                  my={[2, 4, 8]}
                  type="submit"
                  variant="outline"
                  color="white"
                  _hover={{ color: "#FFDE59" }}
                  fontFamily="pressStart2P"
                >
                  Previous
                </Button>
              </Link>
            ) : (
              <span />
            )}
            {page < totalPages ? (
              <Link href={`/blog/page/${page + 1}`}>
                <Button
                  my={[2, 4, 8]}
                  type="submit"
                  variant="outline"
                  color="white"
                  _hover={{ color: "#FFDE59" }}
                  fontFamily="pressStart2P"
                >
                  Next
                </Button>
              </Link>
            ) : (
              <span />
            )}
          </HStack>
        </VStack>
      </Center>
    </Flex>
  );
}
