import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  title: string;
  date: string;
  slug: string;
  content: string;
  categories?: string[];
  tags?: string[];
  excerpt?: string;
  [key: string]: unknown;
}

export interface Page {
  content: string;
  [key: string]: unknown;
}

const postsDirectory = path.join(process.cwd(), "posts");
const contentDirectory = path.join(process.cwd(), "content");

export function padMonthOrDate(date: number): string {
  return date < 10 ? `0${date}` : date.toString();
}

export function getPathFromDate(date: string): string {
  const dateObj = new Date(date);
  return `${dateObj.getFullYear()}/${padMonthOrDate(
    dateObj.getMonth() + 1
  )}/${padMonthOrDate(dateObj.getDate())}`;
}

// Cache for blog posts to avoid re-reading filesystem
let postsCache: Post[] | null = null;

export function getAllPosts(): Post[] {
  // Return cached posts if available
  if (postsCache) {
    return postsCache;
  }

  const years = fs.readdirSync(postsDirectory);
  const posts: Post[] = [];

  years.forEach((year) => {
    const yearPath = path.join(postsDirectory, year);
    if (fs.statSync(yearPath).isDirectory()) {
      const slugs = fs.readdirSync(yearPath);
      slugs.forEach((slug) => {
        const filePath = path.join(yearPath, slug, "index.md");
        if (fs.existsSync(filePath)) {
          const fileContents = fs.readFileSync(filePath, "utf8");
          const { data, content } = matter(fileContents);

          // Generate excerpt from content (first paragraph or 150 chars)
          const excerpt = content
            .split('\n\n')[0]
            .replace(/[#*`]/g, '')
            .substring(0, 150)
            .trim();

          posts.push({
            content,
            slug,
            title: data.title,
            date: data.date,
            categories: data.categories,
            tags: data.tags,
            excerpt: excerpt || data.title,
            ...data,
          });
        }
      });
    }
  });

  // Sort posts by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Cache the results
  postsCache = posts;

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export function getPage(filename: string): Page {
  const filePath = path.join(contentDirectory, `${filename}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Page not found: ${filename}`);
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    content,
    ...data,
  };
}
