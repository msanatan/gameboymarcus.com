import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, children }) => {
      if (href) {
        if (href.startsWith("/")) {
          return (
            <Link href={href} className="text-link underline hover:opacity-80">
              {children}
            </Link>
          );
        }

        return (
          <Link
            href={href}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="text-link underline hover:opacity-80"
          >
            {children}
          </Link>
        );
      }
    },
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-accent bg-gray-100 py-2 pl-4 italic leading-relaxed text-gray-800 md:my-6">
        {children}
      </blockquote>
    ),
    code: ({ children, className, ...props }) => {
      const isInline = !className;

      if (isInline) {
        return (
          <code
            className="rounded-lg bg-code-bg px-2 py-1 font-retro text-xs text-code-text md:text-sm"
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    h1: ({ children }) => (
      <h1 className="py-2 font-retro text-2xl text-black md:py-4 md:text-4xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="py-2 font-retro text-xl text-black md:py-4 md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="py-1 font-retro text-lg text-black md:py-3 md:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="py-1 font-retro text-base text-black md:py-2 md:text-xl">
        {children}
      </h4>
    ),
    img: async ({ src = "", alt = "" }) => {
      return (
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          className="my-4 h-auto w-full rounded object-cover"
        />
      );
    },
    li: ({ children }) => (
      <li className="pl-2 text-sm text-black md:pl-4 md:text-base">
        {children}
      </li>
    ),
    ol: ({ children }) => (
      <ol className="my-2 w-full space-y-2 list-decimal list-inside md:my-4 md:space-y-4">
        {children}
      </ol>
    ),
    p: ({ children }) => (
      <p className="py-2 text-sm leading-relaxed text-black md:py-4 md:text-base md:leading-relaxed">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="my-2 w-full space-y-2 list-disc list-inside md:my-4 md:space-y-4">
        {children}
      </ul>
    ),
    ...components,
  };
}
