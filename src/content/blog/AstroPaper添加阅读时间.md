---
title: AstroPaper 添加阅读时间
author: youquan
pubDatetime: 2023-07-28T15:43:05.569Z
postSlug: AstroPaper 添加阅读时间
featured: false
draft: false
ogImage: /assets/forrest-gump-quote.webp
tags:
  - AstroPaper
  - AStro
  - Remark
description: 为你的 AstroPaper 博客网站添加阅读时间。
---

AstroPaper 基于 remark 来解析 markdown，所以可我们可以使用自定义插件的方式，来添加阅读时间。

![](/assets/blog/image_eK0LWNXBN2.png)

## 前置工作

步骤 1，安装依赖

```bash
yarn add reading-time mdast-util-to-string

```

步骤 2，在 utils 文件夹下新建自定义插件 remark-reading-time.mjs

```javascript
// src/utils/remark-reading-time.mjs
import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.readingTime = readingTime.text;
  };
}
```

步骤 3，在`astro.config.mjs`引用插件

```javascript
// astro.config.mjs
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";

export default defineConfig({
  // other config
  markdown: {
    remarkPlugins: [
      remarkToc,
      remarkReadingTime, // 自定义插件
      // other config
    ],
    // other config
  },
});
```

步骤 4，修改博文的结构 src/content/\_schemas.ts

```typescript
import { z } from "astro:content";

export const blogSchema = z
  .object({
    author: z.string().optional(),
    pubDatetime: z.date(),
    title: z.string(),
    postSlug: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    ogImage: z.string().optional(),
    description: z.string(),
    canonicalURL: z.string().optional(),
    readingTime: z.string().optional(), // 阅读时间
  })
  .strict();

export type BlogFrontmatter = z.infer<typeof blogSchema>;
```

步骤 5，创建一个工具方法 getPostsWithRT.ts，获取阅读时间

```typescript
// src/utils/getPostsWithRT.ts
import type { BlogFrontmatter } from "@content/_schemas";
import type { MarkdownInstance } from "astro";
import slugify from "./slugify";
import type { CollectionEntry } from "astro:content";

export const getReadingTime = async () => {
  // Get all posts using glob. This is to get the updated frontmatter
  //@ts-ignore
  const globPosts = import.meta.glob<MarkdownInstance<BlogFrontmatter>>(
    "../content/blog/*.md"
  );

  // Then, set those frontmatter value in a JS Map with key value pair
  const mapFrontmatter = new Map();
  const globPostsValues = Object.values(globPosts);
  await Promise.all(
    globPostsValues.map(async globPost => {
      const { frontmatter } = await globPost();
      mapFrontmatter.set(slugify(frontmatter), frontmatter.readingTime);
    })
  );

  return mapFrontmatter;
};

const getPostsWithRT = async (posts: CollectionEntry<"blog">[]) => {
  const mapFrontmatter = await getReadingTime();
  return posts.map(post => {
    post.data.readingTime = mapFrontmatter.get(slugify(post.data));
    return post;
  });
};

export default getPostsWithRT;
```

步骤 7，添加 ReadTime 组件

```typescript
// src/components/ReadTime.tsx
export interface Props {
  time: string | undefined;
  size?: "sm" | "lg";
  className?: string;
}

export default function Readtime({ time, size = "sm", className }: Props) {
  return (
    <div className={`flex items-center space-x-2 opacity-80 ${className}`}>
      <svg
        className={`${
          size === "sm" ? "scale-90" : "scale-100"
        } inline-block h-6 w-6 fill-skin-base`}
        viewBox="0 0 1080 950"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M146.286 146.285h554.846l134.962 134.963a404.465 404.465 0 0 1 114.763 109.109v-67.489a73.143 73.143 0 0 0-21.423-51.72L752.852 94.566a73.143 73.143 0 0 0-51.72-21.423H146.286c-40.396 0-73.143 32.747-73.143 73.142v731.429c0 40.396 32.747 73.143 73.143 73.143h244.072a404.556 404.556 0 0 1-78.977-73.143H146.286V146.285z m475.428 804.572c181.781 0 329.143-147.362 329.143-329.143 0-181.781-147.362-329.143-329.143-329.143-181.78 0-329.143 147.362-329.143 329.143 0 181.781 147.363 329.143 329.143 329.143z m0-73.143c-141.385 0-256-114.615-256-256s114.615-256 256-256 256 114.615 256 256-114.615 256-256 256z m0-438.857c-20.198 0-36.571 16.373-36.571 36.571v146.286c0 20.198 16.373 36.571 36.571 36.571H768c20.198 0 36.571-16.373 36.571-36.571 0-20.198-16.373-36.571-36.571-36.571H658.286V475.428c0-20.198-16.374-36.571-36.572-36.571z"></path>
      </svg>
      <span className={`${size === "sm" ? "text-sm" : "text-base"}`}>
        {time}
      </span>
    </div>
  );
}
```

## 博文中添加阅读时间

步骤 1，修改 /src/pages/posts/\[slug].astro

```javascript
// /src/pages/posts/[slug].astro
import getPostsWithRT from "@utils/getPostsWithRT";

export async function getStaticPaths() {
  // other codes
  const postsWithRT = await getPostsWithRT(posts);
  const postResult = postsWithRT.map(post => ({
    params: { slug: slugify(post.data) },
    props: { post },
  }));
  // other codes
}
```

步骤 2，修改 src/layouts/PostDetails.astro，引入 Readtime 组件和使用 readingTime 字段

```javascript
---
import Readtime from "@components/ReadTime";

const { ...,readingTime,} = post.data;
---

<Layout ...>
  //...
  <main id="main-content">
    //...
    <div class="flex items-center">
      <Datetime
        datetime={pubDatetime}
        size="lg"
        className="my-2"
      />&nbsp;&nbsp;&nbsp;<Readtime size="lg" time={readingTime} />
    </div>
     //...
  </main>
  <Footer />
</Layout>

```

就可以看到阅读时长了

![](/assets/blog/image_eK0LWNXBN2.png)

## 博文外添加阅读时长（可选）

步骤 1，修改 utils/getSortedPosts.ts，让默认文章包含阅读时长

```typescript
import type { CollectionEntry } from "astro:content";
import getPostsWithRT from "./getPostsWithRT";

const getSortedPosts = async (posts: CollectionEntry<"blog">[]) => {
  const postsWithRT = await getPostsWithRT(posts); // 这里

  return postsWithRT
    .filter(({ data }) => !data.draft)
    .sort(
      (a, b) =>
        Math.floor(new Date(b.data.pubDatetime).getTime() / 1000) -
        Math.floor(new Date(a.data.pubDatetime).getTime() / 1000)
    );
};

export default getSortedPosts;
```

步骤 2，修改使用了 getSortedPosts 这个方法的页面，让其通过 await 调用

```typescript
const sortedPosts = getSortedPosts(posts); // old code ❌
const sortedPosts = await getSortedPosts(posts); // new code ✅
```

使用了这个方法的页面如下：

- src/pages/index.astro
- src/pages/posts/index.astro
- src/pages/rss.xml.ts
- src/pages/posts/\[slug].astro

步骤 3，在其他页面使用，比如修改 Card.tsx 组件

```typescript
//src/components/Card.tsx
// ...
import Readtime from "./ReadTime";

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, description, readingTime } = frontmatter;
  return (
    <li className="my-6">
      // ...
      <div className="flex items-center">
        <Datetime datetime={pubDatetime} size="lg" className="my-2" />
        &nbsp;&nbsp;&nbsp;
        <Readtime size="lg" time={readingTime} />
      </div>
      // ...
    </li>
  );
}
```

看一下效果

![](/assets/blog/image_PAIdJdp5sy.png)
