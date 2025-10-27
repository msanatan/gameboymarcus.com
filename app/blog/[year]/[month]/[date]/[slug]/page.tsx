import { notFound } from "next/navigation";
import Link from "next/link";
import { posts as allPosts } from "@/.velite";
import "highlight.js/styles/github-dark.css";
import type { Metadata } from "next";

// Sort posts by date descending (newest first)
const posts = [...allPosts].sort((a, b) => 
  new Date(b.date).getTime() - new Date(a.date).getTime()
);

interface BlogPostProps {
  params: Promise<{
    year: string;
    month: string;
    date: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return posts.map((post) => {
    const [year, month, date] = post.url.replace("/blog/", "").split("/").slice(0, 3);
    return {
      slug: post.slug,
      year,
      month,
      date,
    };
  });
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found - GameBoyMarcus" };
  }

  return {
    title: `${post.title} - GameBoyMarcus`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: "article",
      publishedTime: post.dateString,
      authors: ["Marcus Sanatan"],
    },
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
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
          <h1 className="mb-4 font-kenneyBlocks text-3xl text-black">
            {post.title}
          </h1>
          <time className="font-kenneyBlocks text-xs text-black md:text-sm">
            {new Date(post.dateString).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </header>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <nav className="mt-12 flex flex-col justify-center gap-4 border-t-2 border-black pt-8 md:flex-row md:gap-8">
          {prevPost ? (
            <Link
              href={prevPost.url}
              className="font-kenneyBlocks text-xs text-black underline transition-opacity hover:opacity-70 md:text-sm"
            >
              ← {prevPost.title}
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {nextPost ? (
            <Link
              href={nextPost.url}
              className="font-kenneyBlocks text-xs text-black underline transition-opacity hover:opacity-70 md:text-sm"
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
