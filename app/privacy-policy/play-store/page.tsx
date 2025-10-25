import { pages } from "@/.velite";
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
      <div 
        className="mx-auto max-w-3xl prose prose-lg"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
}
