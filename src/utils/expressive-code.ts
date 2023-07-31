import { astroExpressiveCode } from "astro-expressive-code";

export const astroDocsExpressiveCode = () =>
  astroExpressiveCode({
    theme: "one-dark-pro",
    styleOverrides: {
      codeBackground: "var(--theme-code-bg)",
      scrollbarThumbColor: "hsl(269deg 20% 90% / 0.25)",
      scrollbarThumbHoverColor: "hsl(269deg 20% 90% / 0.5)",
    },
    frames: {
      styleOverrides: {
        editorTabBarBackground: "var(--theme-code-tabs)",
        editorActiveTabBackground: "hsl(24.77deg 40% 65% / 15%)",
        editorActiveTabBorderBottom: "hsl(25.36deg 95.22% 49.22%)",
        editorTabBarBorderBottom: "var(--theme-code-tabs)",
        terminalTitlebarBackground: "var(--theme-code-tabs)",
        terminalTitlebarBorderBottom: "transparent",
        terminalBackground: "var(--theme-code-bg)",
      },
    },
    textMarkers: {
      styleOverrides: { defaultChroma: "55" },
    },
  });
