import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPathFromDate } from "../../../../../../lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "../../../../../../mdx-components";
import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import "highlight.js/styles/github-dark.css";
import YouTubeEmbed from "../../../../../../components/embeds/youtube";
import InstagramEmbed from "../../../../../../components/embeds/instagram";

interface BlogPostProps {
  params: {
    year: string;
    month: string;
    date: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => {
    const datePath = getPathFromDate(post.date);
    const [year, month, date] = datePath.split("/");
    return {
      slug: post.slug,
      year,
      month,
      date,
    };
  });
}

export default async function BlogPost({ params }: BlogPostProps) {
  const slug = params.slug;
  const posts = getAllPosts();
  const postIndex = posts.findIndex((post) => post.slug === slug);

  if (postIndex === -1) {
    notFound();
  }

  const post = posts[postIndex];

  const nextPost = posts[postIndex - 1] || null; // Newer post
  const prevPost = posts[postIndex + 1] || null; // Older post

  return (
    <Flex
      id="main"
      as="article"
      bg="#FFDE59"
      w="full"
      grow={1}
      direction="column"
      padding={[4, 16, 32]}
    >
      <Heading
        as="h1"
        fontSize={[32, 48]}
        color="black"
        paddingY={[1, 2, 3]}
        fontFamily="pressStart2P"
        textAlign="center"
      >
        {post.title}
      </Heading>

      <Text
        fontSize={["xs", "sm"]}
        color="black"
        paddingY={[1, 2]}
        fontFamily="pressStart2P"
        textAlign="center"
      >
        <em>{new Date(post.date).toLocaleDateString()}</em>
      </Text>
      <MDXRemote
        source={post.content}
        components={{ ...useMDXComponents({}), YouTubeEmbed, InstagramEmbed }}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight],
          },
        }}
      />
      <Stack
        spacing={[4, 8]}
        direction={["column", "row"]}
        justifyContent="center"
      >
        {prevPost ? (
          <Link
            href={`/blog/${getPathFromDate(prevPost.date)}/${prevPost.slug}`}
          >
            <Text
              fontSize={["xs", "sm"]}
              color="white"
              paddingY={[1, 2]}
              fontFamily="pressStart2P"
              textDecoration="underline"
              _hover={{ color: "black" }}
            >
              ← {prevPost.title}
            </Text>
          </Link>
        ) : (
          <span />
        )}
        {nextPost ? (
          <Link
            href={`/blog/${getPathFromDate(nextPost.date)}/${nextPost.slug}`}
          >
            <Text
              fontSize={["xs", "sm"]}
              color="white"
              paddingY={[1, 2]}
              fontFamily="pressStart2P"
              textDecoration="underline"
              _hover={{ color: "black" }}
            >
              {nextPost.title} →
            </Text>
          </Link>
        ) : (
          <span />
        )}
      </Stack>
    </Flex>
  );
}
