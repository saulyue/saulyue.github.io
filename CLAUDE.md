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

新项目接入完整流程（详见 `docs/services.md`）：

1. 写 Dockerfile（standalone 模式，不内置 Nginx）
2. 写 docker-compose.yml（映射到未用端口）
3. 本地 `tar` 打包 → `scp` 到 ntc 服务器 `/data/<项目名>/`
4. `ssh ntc "cd /data/<项目名> && docker compose up -d --build"`
5. 服务器加 Nginx 配置 → `certbot --nginx -d <项目名>.saulyue.site`
6. 主站 Navbar 加链接（可选）

> ntc 服务器 GitHub 网络不通，**禁止用 git clone**，统一用本地打包上传。

### 当前运行的服务

| 端口 | 服务 | 域名 | 容器名 |
|------|------|------|--------|
| 3000 | saulyue-hub (主站) | saulyue.site | `saulyue-hub` |
| 3002 | agent-node | agent.saulyue.site | `agent-node` |
| 5001 | Dockge (运维面板) | admin.saulyue.site | `dockge` |

### 端口分配

下一个可用：3003、4000、5002

## 关键约定

- 数据层全部 YAML/MDX in Git，不用数据库
- 主题：CSS 变量 + `data-theme` 属性，暗色默认
- 组件全部 Server Component（除 Navbar 是 client）
- 文章发布：`content/articles/xxx.mdx` + push 即生效
- 详细架构文档见 `docs/architecture.md`
