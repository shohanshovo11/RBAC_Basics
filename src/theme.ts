import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "Inter, system-ui, -apple-system, Segoe UI, sans-serif",
    body: "Inter, system-ui, -apple-system, Segoe UI, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "transparent",
        color: "gray.50",
      },
    },
  },
  colors: {
    brand: {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
    },
  },
});

export default theme;
