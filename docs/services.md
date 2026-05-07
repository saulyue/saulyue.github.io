# L3: 业务层 — 服务 & 接入指南

> 主站业务模块 + 子服务接入范式

## 当前业务模块

| 模块 | 路径 | 类型 | 说明 |
|------|------|------|------|
| 首页 | `/` | SSG | Hero + Stats + About + Skills + Experience + Projects + Contact |
| 博客 | `/blog`, `/blog/[slug]` | SSG | MDX 文章系统 |
| 健康检查 | `/api/health` | Dynamic | 运维用 |

## 当前运行的服务

| 端口 | 服务 | 域名 | 容器名 | 状态 |
|------|------|------|--------|------|
| 3000 | saulyue-hub (Next.js 主站) | saulyue.site | `saulyue-hub` | ✅ |
| 3002 | agent-node (Next.js Agent) | agent.saulyue.site | `agent-node` | ✅ |
| 5001 | Dockge (容器管理) | admin.saulyue.site | `dockge` | ✅ |
| — | medicsale | med.saulyue.site | — | 在 tc 服务器 |

---

## 内容更新（最常见操作）

### 发布新文章

```bash
# 1. 创建文件
cat > content/articles/my-new-post.mdx << 'EOF'
---
title: 文章标题
date: "2026-05-07"
description: 一句话描述
tags: [标签A, 标签B]
---

正文内容（支持 MDX）...
EOF

# 2. 提交推送（自动部署）
git add content/articles/my-new-post.mdx
git commit -m "feat(blog): 新增文章 - 文章标题"
git push
```

### 更新项目/技能/经历

编辑对应 YAML 文件：
- `content/data/projects.yaml`
- `content/data/skills.yaml`
- `content/data/experiences.yaml`

提交推送即生效。

---

## 子服务接入 — 完整实操步骤

> 以 `agent-node` 接入为实际案例，任何新项目照此流程操作。

### 前提

- 项目本地能 `build` 成功
- 项目有 Dockerfile（或能写一个）
- 域名 `*.saulyue.site` 已通配解析到 ntc 服务器

### Step 1: 准备 Dockerfile

子服务**不需要 Nginx**，只暴露 Node 端口，Nginx 统一在服务器层做反代。

Next.js 项目通用模板：

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
RUN npm install -g bun
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g bun
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

> 注意：`next.config.ts` 中必须有 `output: "standalone"`

### Step 2: 准备 docker-compose.yml

```yaml
services:
  <服务名>:
    build: .
    container_name: <服务名>
    ports:
      - "<宿主端口>:3000"    # 从端口分配表选一个未用端口
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Step 3: 上传代码到服务器

由于 ntc 服务器访问 GitHub 不稳定，**用本地打包上传**：

```bash
# 本地执行
cd /path/to/your-project
tar --exclude=node_modules --exclude=.next --exclude=.git -czf /tmp/project.tar.gz .
ssh ntc "mkdir -p /data/<项目名>"
scp /tmp/project.tar.gz ntc:/data/<项目名>/
ssh ntc "cd /data/<项目名> && tar -xzf project.tar.gz && rm project.tar.gz"
```

### Step 4: 构建启动容器

```bash
ssh ntc "cd /data/<项目名> && docker compose up -d --build"

# 验证
ssh ntc "docker ps --filter name=<容器名>"
ssh ntc "curl -sI localhost:<宿主端口>"
```

### Step 5: 配置 Nginx 反代

```bash
ssh ntc "cat > /etc/nginx/sites-available/<项目名>.conf << 'EOF'
server {
    listen 80;
    server_name <项目名>.saulyue.site;

    location / {
        proxy_pass http://127.0.0.1:<宿主端口>;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
}
EOF
ln -sf /etc/nginx/sites-available/<项目名>.conf /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx"
```

### Step 6: 申请 HTTPS 证书

```bash
ssh ntc "certbot --nginx -d <项目名>.saulyue.site --non-interactive --agree-tos --email saulyue@qq.com --redirect"
```

### Step 7: 主站加导航链接（可选）

编辑 `src/components/Navbar.tsx`，在 `navLinks` 数组加一条：

```ts
{ href: "https://<项目名>.saulyue.site", label: "<显示名>" },
```

提交推送即自动部署。

---

## 端口分配表

| 端口 | 服务 | 域名 | 状态 |
|------|------|------|------|
| 3000 | saulyue-hub | saulyue.site | ✅ 运行中 |
| 3002 | agent-node | agent.saulyue.site | ✅ 运行中 |
| 3003 | 预留 | — | — |
| 4000 | 预留（Python 服务） | — | — |
| 5001 | Dockge | admin.saulyue.site | ✅ 运行中 |
| 5002 | 预留 | — | — |
| 8000 | medicsale 前端 | med.saulyue.site | 在 tc 服务器 |

> 新项目从 3003、4000、5002 等依次分配。

---

## 接入候选

| 项目 | 技术栈 | 预分配域名 | 优先级 |
|------|--------|-----------|--------|
| superclaw | AI Chat | chat.saulyue.site | P1 |
| objectForm | React | form.saulyue.site | P2 |
| official-website | Vue 3 | biz.saulyue.site | P3 |

---

## 部署流程

### 主站（有 CI/CD）

```
git push main → GitHub Actions → SSH 到 ntc → docker compose up --build
```

### 子服务（手动，后续可加 CI）

```
本地 tar 打包 → scp 到 ntc:/data/<项目名>/ → docker compose up --build
```

### 通过 Dockge 管理

所有 `/data/` 下有 `docker-compose.yml` 的项目会自动出现在 Dockge 面板中，可通过 Web UI 启停/重启/查看日志。
