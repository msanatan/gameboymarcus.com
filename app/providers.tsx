"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { pressStart2P, arcadeGamer } from "./fonts";

const theme = extendTheme({
  fonts: {
    pressStart2P: pressStart2P.style.fontFamily,
    arcadeGamer: arcadeGamer.style.fontFamily,
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
