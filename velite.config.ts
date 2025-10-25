import { defineConfig, defineCollection, s } from "velite";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

// Helper to format date as YYYY/MM/DD
function formatDatePath(date: Date | string): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
}

// Schema for blog posts
const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/index.md",
  schema: s
    .object({
      title: s.string(),
      date: s.isodate(),
      categories: s.array(s.string()).optional(),
      tags: s.array(s.string()).optional(),
      content: s.markdown(),
      excerpt: s.excerpt(),
      metadata: s.metadata(),
    })
    .transform((data, { meta }) => {
      // Extract slug from file path: posts/2024/my-post/index.md -> my-post
      const pathParts = meta.path.split("/");
      const slug = pathParts[pathParts.length - 2]; // Get parent directory name

      // Ensure date is a Date object
      const dateObj = data.date instanceof Date ? data.date : new Date(data.date);

      return {
        ...data,
        slug,
        // Generate URL path from date and slug
        url: `/blog/${formatDatePath(dateObj)}/${slug}`,
        // Format date for easier use
        dateString: dateObj.toISOString(),
      };
    }),
});

// Schema for static pages
const pages = defineCollection({
  name: "Page",
  pattern: "content/*.md",
  schema: s
    .object({
      title: s.string().optional(),
      content: s.markdown(),
      metadata: s.metadata(),
    })
    .transform((data, { meta }) => {
      // Extract slug from file path: content/about.md -> about
      const filename = meta.path.split("/").pop()?.replace(/\.md$/, "") || "";

      return {
        ...data,
        slug: filename,
      };
    }),
});

export default defineConfig({
  root: ".",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts, pages },
  mdx: {
    rehypePlugins: [rehypeHighlight],
    remarkPlugins: [remarkGfm],
  },
});
