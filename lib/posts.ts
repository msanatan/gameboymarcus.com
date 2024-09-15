import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface Post {
  title: string;
  date: string;
  slug: string;
  content: string;
  categories?: string[];
  tags?: string[];
  [key: string]: unknown;
}

const postsDirectory = path.join(process.cwd(), "posts");

export function padMonthOrDate(date: number): string {
  return date < 10 ? `0${date}` : date.toString();
}

export function getPathFromDate(date: string): string {
  const dateObj = new Date(date);
  return `${dateObj.getFullYear()}/${padMonthOrDate(
    dateObj.getMonth()
  )}/${padMonthOrDate(dateObj.getDate())}`;
}

export function getAllPosts(): Post[] {
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
          posts.push({
            content,
            slug,
            title: data.title,
            date: data.date,
          });
        }
      });
    }
  });

  // Sort posts by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}
