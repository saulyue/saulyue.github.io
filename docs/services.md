# L3: 业务层 — 服务 & 接入指南

> 主站业务模块 + 子服务接入范式

## 当前业务模块

| 模块 | 路径 | 类型 | 说明 |
|------|------|------|------|
| 首页 | `/` | SSG | Hero + Stats + About + Skills + Experience + Projects + Contact |
| 博客 | `/blog`, `/blog/[slug]` | SSG | MDX 文章系统 |
| 健康检查 | `/api/health` | Dynamic | 运维用 |

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

## 子服务接入范式

### 三步接入法

任何技术栈的项目（Python / Node / Go / 静态页）都能接入：

```
┌──────────────────────────────────────────────────┐
│ Step 1: DNS                                       │
│   DNSPod 加 A 记录: xxx.saulyue.site → 服务器IP   │
├──────────────────────────────────────────────────┤
│ Step 2: Docker                                    │
│   项目根目录放 Dockerfile，docker run -p PORT:PORT │
├──────────────────────────────────────────────────┤
│ Step 3: Nginx                                     │
│   /etc/nginx/sites-available/ 加 server 块        │
│   certbot --nginx -d xxx.saulyue.site            │
└──────────────────────────────────────────────────┘
```

### Nginx 模板

```nginx
# /etc/nginx/sites-available/xxx.conf
server {
    listen 80;
    server_name xxx.saulyue.site;

    location / {
        proxy_pass http://127.0.0.1:<PORT>;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# 启用后加 HTTPS:
# certbot --nginx -d xxx.saulyue.site
```

### 端口分配

| 端口 | 服务 | 域名 | 状态 |
|------|------|------|------|
| 3000 | saulyue-hub (Next.js) | saulyue.site | ✅ 运行中 |
| 3001 | 预留 | — | — |
| 4000 | 预留（Python 服务） | — | — |
| 5000 | 预留 | — | — |
| 8000 | medicsale 前端 | med.saulyue.site | 在 tc 服务器 |
| 8001 | 预留 | — | — |

### 接入候选

| 项目 | 技术栈 | 预分配域名 | 优先级 |
|------|--------|-----------|--------|
| medicsale | Vue + NestJS | med.saulyue.site | 已运行(tc) |
| superclaw | AI Chat | chat.saulyue.site | P1 |
| objectForm | React | form.saulyue.site | P2 |
| official-website | Vue 3 | biz.saulyue.site | P3 |

---

## 部署流程

```
┌───────────┐      ┌──────────────┐      ┌──────────────┐
│ git push  │─────▶│ GitHub       │─────▶│ ntc 服务器    │
│ (本地)    │      │ Actions      │      │              │
└───────────┘      │ deploy.yml   │      │ git pull     │
                   └──────────────┘      │ docker build │
                                         │ docker up    │
                                         └──────────────┘
```

自动触发条件：push 到 `main` 分支。
