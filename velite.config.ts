import { defineConfig, defineCollection, s } from "velite";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

// Helper to format date as YYYY/MM/DD
function formatDatePath(date: Date | string): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getUTCDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
}

// Frontmatter dates carry no offset, so read them as UTC. Otherwise the URL and
// displayed day depend on the timezone of the machine running the build.
const utcDate = s.string().transform((value, ctx) => {
  const hasOffset = /(Z|UTC|[+-]\d{2}:?\d{2})$/.test(value.trim());
  const parsed = new Date(hasOffset ? value : `${value.trim()} UTC`);
  if (Number.isNaN(parsed.getTime())) {
    ctx.addIssue({ code: "custom", message: `Invalid date: ${value}` });
    return value;
  }
  return parsed.toISOString();
});

// Schema for blog posts
const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/index.md",
  schema: s
    .object({
      title: s.string(),
      date: utcDate,
      categories: s.array(s.string()).optional(),
      tags: s.array(s.string()).optional(),
      content: s.markdown(),
      excerpt: s.excerpt(),
      metadata: s.metadata(),
    })
    .transform((data, { meta }) => {
      // Extract slug from file path: posts/2024/my-post/index.md -> my-post
      const pathParts = (meta.path as string).split("/");
      const slug = pathParts[pathParts.length - 2]; // Get parent directory name

      const dateObj = new Date(data.date);

      return {
        ...data,
        slug,
        // Generate URL path from date and slug
        url: `/blog/${formatDatePath(dateObj)}/${slug}`,
        // Format date for easier use
        dateString: data.date, // Already in ISO string format
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
      const filename = (meta.path as string).split("/").pop()?.replace(/\.md$/, "") || "";

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
  markdown: {
    rehypePlugins: [rehypeHighlight],
    remarkPlugins: [remarkGfm],
  },
  mdx: {
    rehypePlugins: [rehypeHighlight],
    remarkPlugins: [remarkGfm],
  },
});
