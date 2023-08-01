import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";
import { astroDocsExpressiveCode } from "./src/utils/expressive-code";
import { asideAutoImport, astroAsides } from "./src/utils/astro-asides";
import AutoImport from "astro-auto-import";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-paper.pages.dev/", // replace this with your deployed domain
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    AutoImport({
      imports: [asideAutoImport],
    }),
    astroAsides(),
    astroDocsExpressiveCode(),
    react(),
    sitemap(),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      remarkReadingTime,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    extendDefaultPlugins: true,
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
