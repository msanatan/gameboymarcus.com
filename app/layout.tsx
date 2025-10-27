import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navigation/navbar";
import { GoogleAnalytics } from "@next/third-parties/google";
import { inter, kenneyBlocks } from "./fonts";

export const metadata: Metadata = {
  title: "GameBoyMarcus",
  description: "Hi! I'm Marcus and I make things",
  openGraph: {
    title: "GameBoyMarcus",
    description: "Hi! I'm Marcus Sanatan - I make games and software",
    url: "https://gameboymarcus.com",
    siteName: "GameBoyMarcus",
    type: "website",
    images: [
      {
        url: "https://gameboymarcus.com/images/og_logo.png",
        secureUrl: "https://gameboymarcus.com/images/og_logo.png",
        width: 1260,
        height: 630,
        alt: "Logo for GameBoyMarcus",
      },
      {
        url: "https://gameboymarcus.com/images/logo.png",
        secureUrl: "https://gameboymarcus.com/images/logo.png",
        width: 512,
        height: 512,
        alt: "Logo for GameBoyMarcus",
      },
    ],
  },
  twitter: {
    card: "summary",
    creator: "@marcussanatan",
    creatorId: "2942577509",
    siteId: "2942577509",
    title: "GameBoyMarcus",
    description: "Hi! I'm Marcus Sanatan - I make games and software",
    images: [
      {
        url: "https://gameboymarcus.com/images/og_logo.png",
        secureUrl: "https://gameboymarcus.com/images/og_logo.png",
        width: 1260,
        height: 630,
        alt: "Logo for GameBoyMarcus",
      },
      {
        url: "https://gameboymarcus.com/images/logo.png",
        secureUrl: "https://gameboymarcus.com/images/logo.png",
        width: 512,
        height: 512,
        alt: "Logo for GameBoyMarcus",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${kenneyBlocks.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <NavBar />
        <main className="flex flex-1 flex-col">{children}</main>
        <GoogleAnalytics gaId="G-W210S38VMQ" />
      </body>
    </html>
  );
}
