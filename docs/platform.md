# L2: 通用层 — 框架 & 组件

> Next.js 15 Hub 作为 BFF 入口的通用能力说明

## 技术栈

| 层 | 选型 | 版本 |
|----|------|------|
| 框架 | Next.js App Router | 16.2.5 |
| 样式 | Tailwind CSS | 4.2.4 |
| 内容 | next-mdx-remote + gray-matter | 6.0 / 4.0 |
| 数据 | js-yaml | 4.1 |
| 运行时 | Node.js | 22-alpine |
| 包管理 | pnpm | 10.x |

## 目录结构

```
src/
├── app/                    ← 路由层（页面 + API）
│   ├── layout.tsx          ← 全局布局 + 主题初始化
│   ├── page.tsx            ← 首页
│   ├── blog/               ← 博客路由
│   └── api/                ← API Route Handlers
│
├── components/             ← 通用 UI 组件（纯展示）
│   ├── Navbar.tsx          ← 导航栏 (client)
│   ├── Hero.tsx            ← 首屏
│   ├── Stats.tsx           ← 数据展示条
│   ├── SectionHead.tsx     ← 标题组件
│   ├── SkillCloud.tsx      ← 技能网格
│   ├── Timeline.tsx        ← 时间线
│   ├── ProjectCard.tsx     ← 项目卡片
│   └── Footer.tsx          ← 页脚
│
├── lib/                    ← 工具函数（服务端）
│   ├── data.ts             ← YAML 数据读取
│   └── mdx.ts             ← MDX 文章解析
│
content/                    ← 内容源（Git 管理）
├── articles/*.mdx          ← 文章
└── data/*.yaml             ← 结构化数据
```

## 主题系统

采用 CSS 变量 + `data-theme` 属性切换：

```css
/* 暗色（默认） */
[data-theme="dark"] { --accent: #b4f438; --bg: #080810; }
/* 亮色 */
[data-theme="light"] { --accent: #4d7c00; --bg: #f5f3ee; }
```

主题状态持久化到 `localStorage('theme')`，layout.tsx 中通过 inline script 在 HTML 解析前注入，避免闪烁。

## 数据流

```
content/data/*.yaml  →  lib/data.ts  →  page.tsx (Server Component)  →  组件 Props
content/articles/*.mdx  →  lib/mdx.ts  →  blog/[slug]/page.tsx  →  MDXRemote 渲染
```

全部在构建时（SSG）完成，运行时零数据库开销。

## 组件设计原则

1. **Server-first**：除 Navbar（交互）外，全部 Server Component
2. **Props 驱动**：组件不读取文件系统，数据由父页面传入
3. **CSS 变量适配**：所有颜色引用 `var(--xxx)`，自动适配主题
4. **响应式**：Tailwind 断点 `md:` / `lg:` 覆盖移动端

## 新增页面流程

```bash
# 1. 创建路由文件
mkdir -p src/app/new-page
touch src/app/new-page/page.tsx

# 2. 如需数据，在 content/data/ 加 yaml
# 3. 如需新组件，在 src/components/ 创建
# 4. 本地验证
pnpm dev

# 5. 构建检查
pnpm build
```
