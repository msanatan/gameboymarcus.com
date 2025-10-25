import { getPage } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import remarkGfm from "remark-gfm";

export const metadata = {
  title: "About - GameBoyMarcus",
  description: "Learn more about Marcus Sanatan, software and game developer from Trinidad and Tobago",
};

export default async function AboutPage() {
  const page = getPage("about");

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
