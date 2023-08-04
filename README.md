# AstroBlog 博客系统

![AstroPaper](./screenshot.png)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub](https://img.shields.io/github/license/satnaing/astro-paper?color=%232F3741&style=for-the-badge)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white&style=for-the-badge)](https://conventionalcommits.org)
![mdx](https://img.shields.io/badge/mdx-yellow?style=for-the-badge&logo=MDX&logoColor=white)
![giscus](https://img.shields.io/badge/giscus-%2319c37d?style=for-the-badge&logo=giscus&logoColor=white)

AstroBlog 是一款开箱即用的博客系统。[在线案例](https://jizhule.cn)。

该系统基于 [AstroPaper](https://github.com/satnaing/astro-paper) 进行二次开发，在原来系统的基础上增加了一些定制化的功能。

如果你对二次开发的内容感兴趣，可以阅读 [Astro 搭建博客系列]()。

## 系统特色

- ✅ 响应式
- ✅ 支持 mdx 文档
- ✅ 支持 md 拓展语法，比如高亮删减行、特定行，设置标题等
- ✅ 支持评论（giscus）
- ✅ 支持 aside 友好提示
- ✅ 支持显示阅读时长
- ✅ 白天黑夜两个主题

## 本地运行

1. 安装依赖(确保 node 版本大于 16）

```bash
yarn
```

2. 新建 `.env` 文件，写入 giscus 配置（可选）

```text title=".env"
# Giscus Config
GISCUS_REPO=【替换为你的仓库名称】
GISCUS_REPO_ID=【替换为你的仓库id】
GISCUS_CATEGORY_ID=【替换为你的目录id】
GISCUS_lang=【替换为你的默认语言】
```

如何获取 giscus 配置，可以参考

3. 打开浏览器，输入 `http://127.0.0.1:3000/` 即可。

## 添加文章&修改配置

项目的大致目录如下所示：

```bash
├── public/
│   ├── assets/
│   │   └── logo.svg
├── src/
│   ├── assets/
│   │   └── socialIcons.ts
│   ├── components/
│   ├── content/
│   │   |  blog/
│   │   |    └── some-blog-posts.md
│   │   └── _schemas.ts
│   │   └── config.ts
│   ├── layouts/
│   └── pages/
│   └── styles/
│   └── utils/
│   └── config.ts
│   └── types.ts
└── package.json
```

- **添加文章**：进入 `src/content/blog`，新建 md 或者 mdx 文档
- **更换 logo**：替换 `public/assets` 下的 logo.svg
- **更改配置**：进入`src/config.ts`，有选择性修改

## 远端部署

方式一：使用 vercel 一键部署（推荐 👍）。

1. 点击 [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyq612%2Fastro-blog&env=GISCUS_REPO,GISCUS_REPO_ID,GISCUS_CATEGORY_ID,GISCUS_lang&envDescription=Giscus%E7%9A%84%E9%85%8D%E7%BD%AE)
   创建项目
2. 进入项目 settings，点击 environment-variables，在右侧添加以下环境变量，用于配置评论系统。变量名称参考**本地运行中的第 2 步配置**。
   ![](public/assets/blog/Snipaste_2023-08-02_16-44-14.png)
3. 如果需要绑定域名，可以在 settings 页面点击 domains 进行配置（可选）

查看[部署示例](https://jizhule.cn/)。

方式二：自行打包部署

1. 执行打包命令

```bash
yarn build
```

2. 将打包产出的 dist 中的所有文件，复制到你的服务器静态资源目录即可（比如配合 nginx ）。

这种方式需要自己配置 CI/CD，自己购买服务器和配置网站。

## 反馈与建议

如果有任何的建议或疑问，欢迎提 issue 或者通过<a href="mailto:695601924@qq.com">邮箱</a>联系我。

## License

Licensed under the MIT License, Copyright © 2023

---

Made with ❤️ by [YouQuan](https://jizhule.cn)
