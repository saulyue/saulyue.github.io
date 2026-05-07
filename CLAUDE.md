# CLAUDE.md — saulyue.site 个人微服务主站

## 项目概述

个人微服务 Hub，Next.js 15 App Router 架构，作为 BFF 入口承载主页、博客、API 和子服务路由。

- 线上地址：https://saulyue.site
- 仓库：`saulyue/saulyue.github.io`（SSH remote: `git@github-saulyue:saulyue/saulyue.github.io.git`）
- 服务器：`ssh ntc`（146.56.250.72，Debian 13，Docker 26.1）
- 部署路径：`/data/saulyue-hub`
- CI/CD：push main → GitHub Actions → SSH 自动 `docker compose up -d --build`

## 技术栈

- **框架**：Next.js 16.2 + TypeScript + Tailwind CSS 4
- **内容**：MDX（next-mdx-remote）+ YAML（js-yaml）
- **部署**：Docker multi-stage（node:22-alpine standalone）+ Nginx 反代 + Let's Encrypt HTTPS
- **包管理**：pnpm

## 目录结构

```
src/app/           → 路由（page.tsx, blog/, api/）
src/components/    → 8 个 UI 组件（Navbar, Hero, Stats, SectionHead, SkillCloud, Timeline, ProjectCard, Footer）
src/lib/           → 工具函数（data.ts 读 YAML, mdx.ts 解析文章）
content/articles/  → .mdx 文章文件
content/data/      → skills.yaml, experiences.yaml, projects.yaml
docs/              → 分层架构文档（infra/platform/services/changelog）
```

## 常用命令

```bash
pnpm dev              # 本地开发
pnpm build            # 构建（验证类型 + SSG）
ssh ntc "cd /data/saulyue-hub && git pull && docker compose up -d --build"  # 手动部署
```

## 子服务接入

新项目三步法：DNS A 记录 → Docker 容器 → Nginx server 块 + certbot

| 端口 | 服务 | 域名 |
|------|------|------|
| 3000 | saulyue-hub | saulyue.site |
| 待分配 | superclaw | chat.saulyue.site |
| 待分配 | objectForm | form.saulyue.site |

## 关键约定

- 数据层全部 YAML/MDX in Git，不用数据库
- 主题：CSS 变量 + `data-theme` 属性，暗色默认
- 组件全部 Server Component（除 Navbar 是 client）
- 文章发布：`content/articles/xxx.mdx` + push 即生效
- 详细架构文档见 `docs/architecture.md`
