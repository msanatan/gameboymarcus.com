import type { Metadata } from "next";
import { Providers } from "./providers";
import { Flex } from "@chakra-ui/react";
import "./globals.css";
import NavBar from "@/components/navigation/navbar";

export const metadata: Metadata = {
  title: "GameBoyMarcus",
  description: "Hi! It's Marcus the game developer",
  openGraph: {
    title: "GameBoyMarcus",
    description: "Hi! It's Marcus the game developer",
    url: "https://gameboymarcus.com",
    siteName: "GameBoyMarcus",
    type: "website",
    images: [
      {
        url: "https://gameboymarcus.com/images/logo.jpg",
        secureUrl: "https://gameboymarcus.com/images/logo.jpg",
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
    <html lang="en">
      <body>
        <Providers>
          <Flex direction="column" minH="100vh">
            <NavBar />
            {children}
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
