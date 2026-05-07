# CLAUDE.md — saulyue.site 个人微服务主站

## 架构定位

个人微服务 Hub。主站作为 BFF 入口，子服务通过子域名独立部署。

## 基础设施

| 资源 | 值 |
|------|-----|
| 主站 | https://saulyue.site |
| 服务器 | `ssh ntc`（146.56.250.72，Debian 13） |
| 主站部署路径 | `/data/saulyue-hub` |
| 运维面板 | https://admin.saulyue.site（Dockge） |
| CI/CD | push main → GitHub Actions → 自动部署 |
| GitHub SSH | Host 别名 `github-saulyue` |

## 技术栈

主站：Next.js 16 + TypeScript + Tailwind 4 + pnpm
部署：Docker standalone + Nginx 反代 + Let's Encrypt
内容：MDX 文章 + YAML 数据（Git 管理，无数据库）

## 目录结构

```
src/app/           → 路由
src/components/    → UI 组件
src/lib/           → 工具函数（data.ts, mdx.ts）
content/           → 文章(.mdx) + 数据(.yaml)
docs/              → 架构文档
```

## 当前服务

| 端口 | 容器 | 域名 |
|------|------|------|
| 3000 | saulyue-hub | saulyue.site |
| 3002 | agent-node | agent.saulyue.site |
| 5001 | dockge | admin.saulyue.site |

下一个可用端口：3003、4000、5002

## 子服务接入（核心流程）

```
Dockerfile + compose → 打包上传 /data/<name>/ → docker compose up → Nginx 反代 → certbot HTTPS
```

约束：
- 子服务不内置 Nginx，只暴露端口
- ntc 不能访问 GitHub，代码用 scp 上传
- 详细步骤见 `docs/services.md`

## 约定

- 暗色主题默认，CSS 变量 + `data-theme` 切换
- 组件 Server-first，仅 Navbar 是 client
- 文章/数据：改文件 + push 即生效
