import localFont from "next/font/local";
import { Inter } from "next/font/google";

// Readable body font
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Keep retro font for headings/accents
export const pressStart2P = localFont({
  src: "./fonts/PressStart2P-Regular.ttf",
  variable: "--font-press-start",
  display: "swap",
});

export const kenneyBlocks = localFont({
  src: "./fonts/Kenney-Blocks.ttf",
  variable: "--font-kenney-blocks",
  display: "swap",
});

export const arcadeGamer = localFont({
  src: "./fonts/ArcadeGamer-Regular.ttf",
  variable: "--font-arcade-gamer",
  display: "swap",
});
