# Velite Migration Guide

## Status: 90% Complete

Velite is installed and configured! Generated 65/67 blog posts successfully.

## What's Done ✅

1. **Velite installed** (`npm install velite -D`)
2. **Config created** (`velite.config.ts`) with proper schemas for posts and pages
3. **Scripts updated** in `package.json`:
   - `dev`: `velite --watch & next dev`
   - `build`: `velite && next build`
4. **Gitignore updated** to exclude `.velite/` and `public/static/`
5. **Content generated** - Run `npx velite` and check `.velite/` directory

## What's Left TODO 📝

### 1. Update Blog Post Page

Replace `app/blog/[year]/[month]/[date]/[slug]/page.tsx` with:

```typescript
import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/.velite";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
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
  const post = posts.find((p) => p.slug === params.slug);

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
  const postIndex = posts.findIndex((post) => post.slug === params.slug);

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
            {new Date(post.dateString).toLocaleDateString("en-US", {
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
              href={prevPost.url}
              className="font-retro text-xs text-black underline transition-opacity hover:opacity-70 md:text-sm"
            >
              ← {prevPost.title}
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {nextPost ? (
            <Link
              href={nextPost.url}
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
```

### 2. Update Blog Listing Page

Replace `app/blog/page/[page]/page.tsx` with:

```typescript
import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/.velite";

const POSTS_PER_PAGE = 10;

interface BlogPageProps {
  params: {
    page: string;
  };
}

export async function generateStaticParams() {
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export async function generateMetadata({ params }: BlogPageProps) {
  const page = parseInt(params.page, 10);
  return {
    title: `Blog - Page ${page} - GameBoyMarcus`,
    description: "Thoughts on software development, AI, games, and more by Marcus Sanatan",
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const page = parseInt(params.page, 10);

  if (isNaN(page) || page < 1) {
    notFound();
  }

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  if (page > totalPages && totalPages !== 0) {
    notFound();
  }

  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return (
    <div className="flex-1 bg-black px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-12 text-center font-retro text-3xl text-primary md:text-4xl">
          Blog
        </h1>

        <ul className="space-y-8">
          {paginatedPosts.map((post) => (
            <li key={post.slug} className="border-b border-primary pb-8 last:border-0">
              <Link href={post.url} className="group">
                <h2 className="mb-3 font-retro text-lg text-primary underline transition-opacity group-hover:opacity-80 md:text-xl">
                  {post.title}
                </h2>
                <p className="mb-2 text-xs text-white md:text-sm">
                  {new Date(post.dateString).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {post.excerpt && (
                  <p className="text-sm text-gray-300 md:text-base">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex items-center justify-center gap-8">
          {page > 1 ? (
            <Link
              href={`/blog/page/${page - 1}`}
              className="rounded border-2 border-white px-6 py-3 font-retro text-sm text-white transition-colors hover:border-primary hover:text-primary"
            >
              Previous
            </Link>
          ) : (
            <div className="w-28" />
          )}

          <span className="font-retro text-sm text-white">
            Page {page} of {totalPages}
          </span>

          {page < totalPages ? (
            <Link
              href={`/blog/page/${page + 1}`}
              className="rounded border-2 border-white px-6 py-3 font-retro text-sm text-white transition-colors hover:border-primary hover:text-primary"
            >
              Next
            </Link>
          ) : (
            <div className="w-28" />
          )}
        </div>
      </div>
    </div>
  );
}
```

### 3. Update About Page

Replace `app/about/page.tsx` with:

```typescript
import { pages } from "@/.velite";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";

export const metadata = {
  title: "About - GameBoyMarcus",
  description: "Learn more about Marcus Sanatan, software and game developer from Trinidad and Tobago",
};

export default async function AboutPage() {
  const page = pages.find((p) => p.slug === "about");

  if (!page) {
    notFound();
  }

  return (
    <div className="flex-1 bg-primary px-4 py-12 md:px-16 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-center font-retro text-3xl text-black md:text-4xl">
          About Me
        </h1>
        <div className="prose prose-lg max-w-none">
          <MDXRemote
            source={page.content}
            components={useMDXComponents({})}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
```

### 4. Update Privacy Policy Page

Replace `app/privacy-policy/play-store/page.tsx` with:

```typescript
import { pages } from "@/.velite";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Privacy Policy - GameBoyMarcus",
  description: "Privacy policy for Marcus Sanatan Software Services",
};

export default async function PrivacyPolicyPage() {
  const page = pages.find((p) => p.slug === "privacy-policy");

  if (!page) {
    notFound();
  }

  return (
    <div className="flex-1 bg-primary px-4 py-12 md:px-16 md:py-16">
      <div className="mx-auto max-w-3xl prose prose-lg">
        <MDXRemote
          source={page.content}
          components={useMDXComponents({})}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>
    </div>
  );
}
```

### 5. Clean Up

After testing, remove old files:
- `lib/content.ts` (or `lib/posts.ts`)
- Remove dependencies: `next-mdx-remote`, `gray-matter`

```bash
npm uninstall next-mdx-remote gray-matter
```

## Testing

1. Run `npx velite` to generate content
2. Run `npm run dev` to test locally
3. Check all blog posts load correctly
4. Run `npm run build` to test production build

## Benefits of Velite

- ✅ **Type-safe**: Auto-generated TypeScript types in `.velite/index.d.ts`
- ✅ **Fast**: Build-time processing, cached between builds
- ✅ **Simple**: Just import `{ posts, pages } from "@/.velite"`
- ✅ **Framework-agnostic**: Won't break with Next.js updates

## Known Issues

2 posts have MDX processing errors (out of 67):
- `posts/2021/2020-was-a-good-year/index.md` - has relative link
- `posts/2021/devlog-dodge-kicking-off-dodge/index.md` - unknown issue

These can be fixed later by updating the markdown content.
