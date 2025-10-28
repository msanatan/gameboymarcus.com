import { pages } from "@/.velite";
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
    <div className="flex-1 bg-primary px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-12 text-center font-kenneyBlocks text-3xl text-black">
          About Me
        </h1>
        <div 
          className="prose prose-lg max-w-none text-black"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
}
