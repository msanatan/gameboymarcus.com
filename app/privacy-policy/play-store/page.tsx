import { getPage } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import remarkGfm from "remark-gfm";

export const metadata = {
  title: "Privacy Policy - GameBoyMarcus",
  description: "Privacy policy for Marcus Sanatan Software Services",
};

export default async function PrivacyPolicyPage() {
  const page = getPage("privacy-policy");

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
