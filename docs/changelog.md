# 变更日志

## 2026-05-07 — v1.1 子服务接入 + 运维面板

### 新增

- [x] **agent-node** 接入（agent.saulyue.site，端口 3002）
- [x] **Dockge** 容器管理面板（admin.saulyue.site，端口 5001）
- [x] 主站导航加 Agent 链接
- [x] 博客路由修复（`#blog` → `/blog`）
- [x] services.md 补充完整子服务接入实操步骤（6步闭环）

### 踩坑

| 问题 | 原因 | 解决 |
|------|------|------|
| ntc 服务器 git clone GitHub 失败 | 网络不通 | 本地 tar + scp 上传 |
| Dockge 容器 Created 但没启动 | docker run 后未自动 start | `docker start dockge` |
| agent-node Dockerfile 内网镜像 | 原用腾讯内网 csighub 镜像 | 改用公共 node:22-alpine |

---

## 2026-05-07 — v1.0 初始化

### 完成事项

**基建层 (L1)**
- [x] ntc 服务器环境初始化（Docker 26.1 + Nginx 1.26 + Certbot）
- [x] Docker 镜像加速配置（国内源）
- [x] Nginx 反向代理配置
- [x] DNS 解析（saulyue.site → 146.56.250.72）
- [x] HTTPS 证书申请 + 自动续签
- [x] GitHub Actions CI/CD（SSH 自动部署）
- [x] GitHub SSH key 配置（saulyue 账号 ed25519 密钥）

**通用层 (L2)**
- [x] Next.js 15 项目初始化（App Router + TypeScript + Tailwind 4）
- [x] 暗/亮主题系统（CSS 变量 + localStorage 持久化）
- [x] 8 个通用组件（Navbar/Hero/Stats/SectionHead/SkillCloud/Timeline/ProjectCard/Footer）
- [x] MDX 文章引擎（gray-matter + next-mdx-remote）
- [x] YAML 数据驱动（skills/experiences/projects）
- [x] Docker multi-stage 构建（standalone 输出）

**业务层 (L3)**
- [x] 首页完整渲染（7 个区块）
- [x] 博客系统（列表 + 详情）
- [x] API 健康检查（/api/health）
- [x] 示例文章（hello-world.mdx）

### 关键路径

```
本地 HTML 单页 → Next.js 15 重构 → Docker 打包 → ntc 服务器部署 → HTTPS 上线
```

### 踩坑记录

| 问题 | 原因 | 解决 |
|------|------|------|
| SSH ntc 连不上 | 轻量服务器绑定密钥需通过控制台 | 控制台创建密钥 → 绑定实例 |
| Docker pull 失败 | Docker Hub 国内不可达 | 配置 `/etc/docker/daemon.json` 镜像加速 |
| SkillCloud 类型错误 | 组件 prop 名 vs 数据结构不一致 | page.tsx 中做数据转换 |
| ProjectCard TS 错误 | 动态标签类型不兼容 | 改为条件渲染 `<a>` / `<div>` |
| GitHub push 403 | HTTPS remote 绑定了另一个账号 | 改用 SSH remote + Host 别名 |

---

## 待办（下一阶段）

- [ ] 首页头像替换为真实照片
- [ ] 邮箱地址更新
- [ ] 接入 med.saulyue.site（DNS 指向 tc 服务器）
- [ ] 写 3-5 篇技术文章
- [ ] 添加 Open Graph 图片
- [ ] 接入 superclaw AI Chat
