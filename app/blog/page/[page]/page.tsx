import { notFound } from "next/navigation";
import Link from "next/link";
import { posts as allPosts } from "@/.velite";

const POSTS_PER_PAGE = 10;

// Sort posts by date descending (newest first)
const posts = [...allPosts].sort((a, b) => 
  new Date(b.date).getTime() - new Date(a.date).getTime()
);

interface BlogPageProps {
  params: Promise<{
    page: string;
  }>;
}

export async function generateStaticParams() {
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { page: pageParam } = await params;
  const page = parseInt(pageParam, 10);
  return {
    title: `Blog - Page ${page} - GameBoyMarcus`,
    description: "Thoughts on software development, AI, games, and more by Marcus Sanatan",
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { page: pageParam } = await params;
  const page = parseInt(pageParam, 10);

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
        <h1 className="mb-12 text-center font-retro text-3xl text-primary">
          Blog
        </h1>

        <ul className="space-y-8">
          {paginatedPosts.map((post) => (
            <li key={post.slug} className="border-b border-primary pb-8 last:border-0">
              <Link href={post.url} className="group">
                <h2 className="mb-3 font-bold text-lg text-primary underline transition-opacity group-hover:opacity-80 md:text-xl">
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
