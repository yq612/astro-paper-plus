---
title: AstroPaper 高亮 md 代码块扩展语法
author: youquan
pubDatetime: 2023-07-31T15:39:05.569Z
postSlug: AstroPaper 高亮 markdown 扩展语法
featured: false
draft: false
ogImage: /assets/forrest-gump-quote.webp
tags:
  - AstroPaper
  - AStro
  - Remark
  - markdown
description: 高亮 markdown 的拓展语法。
---

官方提供的 demo 版本默认不支持高亮 md 代码块扩展语法，比如设置标题，高亮删减行、特定行、特定代码段等。

我们需要通过 astro 提供的 astro-expressive-code 插件来配置我们的主题。

## 修改配置

步骤 1，新建自定义 integrations 插件 expressive-code.ts

这里是用到了两个 css 变量：`--theme-code-bg` 和 `--theme-code-tabs`

```ts title="src/utils/expressive-code.ts" "var(--theme-code-bg)" "var(--theme-code-tabs)"
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
```

步骤 2，添加 css 变量

```css title="src/styles/base.css" ins={4-5,8-9}
@layer base {
  :root,
  html[data-theme="light"] {
    --theme-code-tabs: #22272f;
    --theme-code-bg: #282c34;
  }
  html[data-theme="dark"] {
    --theme-code-tabs: #22272f;
    --theme-code-bg: #282c34;
  }
}
```

步骤 3，修改 astro 配置

```js ins={1,5} del={11-14}
import { astroDocsExpressiveCode } from "./src/utils/expressive-code";

export default defineConfig({
  integrations: [
    astroDocsExpressiveCode(),
    react(),
    sitemap(),
    // ... others
  ],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
});
```

## 相关 demo

### 1. 高亮新增(ins)行、删除(del)行

````txt
```js ins={1-2,3} del={5-6,8}
````

效果：

```js ins={1-2,3} del={5-6,8}
import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";

export default defineConfig({
  markdown: {
    // 应用于 .md 和 .mdx 文件
    remarkPlugins: [remarkToc, rehypeAccessibleEmojis],
  },
});
```

### 2. 高亮选中行

````txt
```typescript {2}
````

效果：

```typescript {2}
export interface Props {
  time: string | undefined;
  size?: "sm" | "lg";
}
```

### 3. 设置代码标题

````txt
```js title="astro.config.mjs"
````

效果：

```typescript title="astro.config.ts"
export interface Props {
  time: string | undefined;
}
```

### 4. 高亮部分代码

````txt
```js "import { a } from "./plugin.mjs";" "remarkPlugins: [a],"
````

效果：

```js "import { a } from "./plugin.mjs";" "remarkPlugins: [a],"
import { defineConfig } from "astro/config";
import { a } from "./plugin.mjs";

export default defineConfig({
  integrations: [
    mdx({
      remarkPlugins: [a],
    }),
  ],
});
```
