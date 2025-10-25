"use client";

import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog/page/1" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black px-4 py-4 md:px-8">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="px-4 py-2 md:px-8">
          <h1 className="font-retro text-2xl text-primary hover:opacity-80 transition-opacity">
            GBM
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 px-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-retro text-sm text-primary hover:underline md:text-base"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex px-4 text-primary md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-retro text-sm text-primary hover:underline"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
