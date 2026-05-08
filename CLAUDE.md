# CLAUDE.md — saulyue.site 个人微服务主站

## 架构定位

个人微服务 Hub。主站作为 BFF 入口，子服务通过子域名独立部署。

## 基础设施

| 资源 | 值 |
|------|-----|
| 主站 | https://saulyue.site |
| 南京服务器 | `ssh ntc`（146.56.250.72，Debian 13，2C/2G + 2G Swap）— 前端 + 国内业务 |
| 东京服务器 | `ssh tc`（43.163.205.120，CentOS 7，2C/2G）— 纯后端 API + 海外直连 |
| MySQL | `sh-cynosdbmysql-grp-hkebiel2.sql.tencentcdb.com:21397`（上海，MySQL 8.0，到期 2028） |
| 运维面板 | https://admin.saulyue.site（Dockge，在 ntc） |
| COS 桶 | `yue-1252705137`（ap-nanjing），前端静态资源托管 |
| CI/CD | push → GitHub Actions build → scp 产物到服务器 |
| GitHub SSH | Host 别名 `github-saulyue`（ed25519 密钥） |

### 服务器分工

```
ntc（南京）— 面向用户出页面、国内业务
tc（东京）— 纯后端 API、调用海外服务（OpenAI/GitHub）、代理中转
两者延迟 ~60ms，服务互调无压力
```

## 技术栈

主站：Next.js 16 + TypeScript + Tailwind 4 + pnpm
部署：Node standalone + Docker volume 挂载 + Nginx 反代 + Let's Encrypt
内容：MDX 文章 + YAML 数据（Git 管理，无数据库）
前端静态：COS CDN 托管（不占服务器资源）

## 目录结构

```
src/app/           → 路由
src/components/    → UI 组件
src/lib/           → 工具函数（data.ts, mdx.ts）
content/           → 文章(.mdx) + 数据(.yaml)
docs/              → 架构文档
```

## 当前服务

| 端口 | 容器 | 域名 | 仓库 |
|------|------|------|------|
| 3000 | saulyue-hub | saulyue.site | saulyue/saulyue.github.io |
| 3001 | medicine-backend | med.saulyue.site | saulyue/medicine |
| 3002 | agent-node | agent.saulyue.site | saulyue/agent-node |
| 5001 | dockge | admin.saulyue.site | — |

med.saulyue.site 前端走 COS（`cos://yue-1252705137/med/`），不占服务器端口。

下一个可用端口：3003、4000、5002

## 部署模式（核心原则）

**服务器不做任何编译**。所有 build 在 GitHub Actions 完成，服务器只运行产物。

```
push → Actions build → scp 产物到 /data/<name>/ → docker compose up（volume 挂载运行）
```

前端静态产物 → 上传 COS，Nginx 代理 COS 出页面
后端 Node 产物 → scp 到服务器，Docker volume 挂载运行

## 子服务接入（核心流程）

1. 本地确保 build 通过，所有依赖写在 package.json
2. GitHub 建仓库，配 Secrets（SSH_PRIVATE_KEY, COS_SECRET_ID/KEY）
3. 写 CI（Actions build → scp 产物 / coscmd 上传 COS）
4. 服务器加 docker-compose.yml（volume 挂载，不做 build）
5. Nginx 加 server 块 → certbot HTTPS
6. 主站 Navbar 加链接（可选）

约束：
- ntc 不能访问 GitHub，产物由 CI scp 传入
- 子服务不内置 Nginx，只暴露端口
- 前端静态产物优先走 COS CDN
- 容器加 mem_limit 防 OOM
- 详细步骤见 `docs/services.md`

## 约定

- 暗色主题默认，CSS 变量 + `data-theme` 切换
- 组件 Server-first，仅 Navbar 是 client
- 文章/数据：改文件 + push 即生效
- Dockge 管理所有容器（compose 文件放 /data/ 下）
- 数据库密码通过 GitHub Secrets → CI 写入服务器 .env，代码中不硬编码
- Next.js standalone 部署注意：工作目录必须是 `.next/standalone/`，static 需挂载到 `.next/static`

## 按需加载规则

| 触发场景 | 读取文件 |
|---------|---------|
| 接入新服务、部署、Docker、Nginx、HTTPS、子域名、COS | `docs/services.md` |
| 服务器初始化、重装系统、环境搭建 | `docs/infra.md` |
| 框架升级、新增组件、修改主题 | `docs/platform.md` |
