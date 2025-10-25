import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPathFromDate } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import "highlight.js/styles/github-dark.css";
import YouTubeEmbed from "@/components/embeds/youtube";
import InstagramEmbed from "@/components/embeds/instagram";
import type { Metadata } from "next";

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

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found - GameBoyMarcus",
    };
  }

  return {
    title: `${post.title} - GameBoyMarcus`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: ["Marcus Sanatan"],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.excerpt || post.title,
    },
  };
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
    <article className="flex-1 bg-primary px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="mb-4 font-retro text-2xl text-black md:text-4xl">
            {post.title}
          </h1>
          <time className="font-retro text-xs text-black md:text-sm">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </header>

        <div className="prose prose-lg max-w-none">
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
        </div>

        <nav className="mt-12 flex flex-col justify-center gap-4 border-t-2 border-black pt-8 md:flex-row md:gap-8">
          {prevPost ? (
            <Link
              href={`/blog/${getPathFromDate(prevPost.date)}/${prevPost.slug}`}
              className="font-retro text-xs text-black underline transition-opacity hover:opacity-70 md:text-sm"
            >
              ← {prevPost.title}
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {nextPost ? (
            <Link
              href={`/blog/${getPathFromDate(nextPost.date)}/${nextPost.slug}`}
              className="font-retro text-xs text-black underline transition-opacity hover:opacity-70 md:text-sm"
            >
              {nextPost.title} →
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      </div>
    </article>
  );
}
