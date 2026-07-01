# AGENTS.md

> 本文件是 opencode 的项目上下文，启动时自动读取。
> 在此描述项目意图、约定、命令与结构，让 agent 行为更贴合本项目。
> 可用 `opencode.json` 的 `instructions` 字段追加更多上下文文件。

## 项目简介

- **名称**：project（npm workspaces 单仓）
- **类型**：全栈 TypeScript —— 前端 React + Vite + 后端 Hono（Vercel serverless 函数，位于 `apps/web/api/`）。作为全平台（桌面/Web/安卓/iOS）开发的统一起点，后续按需扩展桌面（Tauri/Electron）、移动端（React Native）
- **目标**：以 TypeScript 为核心，渐进式搭建跨端应用

## 目录结构

```
project/
├── AGENTS.md          # 本文件：项目上下文与约定（opencode 自动读取）
├── opencode.json      # opencode 配置
├── package.json       # 根：workspaces 配置与聚合脚本
├── apps/
│   └── web/           # 前端 + 后端（同一个 Vercel 项目）
│       ├── api/       # 后端：Hono serverless 函数（[[...route]].ts，edge 运行时）
│       ├── src/       # 前端源码（main.tsx、App.tsx、i18n/）
│       ├── public/    # 静态资源
│       └── index.html / vite.config.ts / tsconfig*.json / package.json
├── tests/             # 测试（待启用）
├── docs/              # 文档
└── .opencode/         # opencode 扩展：agent / command / skill
```

> 本地全栈开发：在 `apps/web` 跑 `npx vercel dev`（同时启动前端 + `/api`，与生产行为一致，推荐）。
> 纯前端快速预览（不含 API）：`npm run dev:web`。生产环境前后端同源 `daweige-dev.vercel.app`，`/api/...` 免跨域。

## 开发命令

在**仓库根目录**执行：

- 安装依赖：`npm install`
- 本地全栈开发（前端 + API，推荐）：`cd apps/web && npx vercel dev`
- 纯前端快速预览（不含 API）：`npm run dev:web`（Vite，http://localhost:5173）
- 构建前端：`npm run build:web`（= `tsc -b && vite build`）
- 构建（等同 build:web）：`npm run build`
- 测试：待启用（暂未接入框架）

> 约定：完成任务后，必须先跑 `npm run build`（类型检查 + 打包）通过再交付。
> 注意：`api/` 由 Vercel 编译为 serverless 函数，**不在前端 tsc 范围**（tsconfig.app 仅 include `src`）。需验证接口时用 `vercel dev` 实测。

> 本机环境（WSL/IPv6/npm 镜像/原生文件系统）与通用代码约定见**全局** `~/.config/opencode/AGENTS.md`（所有项目自动生效），本文件只写本项目专属内容。

## Git 约定

- **日常小改动（功能修复、配置调整、文档更新等）可直接提交**，提交后汇报即可，无需逐次询问。
- **需先确认再做的操作**：`push`、`amend`、`force-push`、删除分支、`reset --hard` 等不可逆或影响远程的动作。
- 提交信息遵循仓库既有风格：中文、简洁、第一行祈使语气，必要时附正文说明动机。
- 仅暂存与本次改动相关的文件，不要 `git add .` 把无关变更一并带入。
- 提交前自行跑一次 `npm run build`（含类型检查）确保不破坏构建。

## 注意事项 / 项目特有规则

<!-- 例如：特定目录禁止改动、必须兼容某版本、性能约束等 -->
TODO：补充本项目独有的约束。

## 部署（GitHub + Vercel 自动部署）

- **GitHub 仓库**：`yusencai1996-gif/daweige`（SSH：`git@github.com:yusencai1996-gif/daweige.git`）
- **Vercel 项目**：`daweige`，已连接上述仓库，分支 `main`
- **Root Directory**：`apps/web`（Vercel 同时构建前端 `dist` 和 `api/` serverless 函数）
- **自动部署**：每次 `git push origin main` 自动触发 Vercel 构建并发布到生产域名（前端 + API 一起更新）
- **生产网址**：https://daweige-dev.vercel.app
- **线上 API**（edge 运行时）：`GET /api`、`GET /api/health`、`GET /api/hello?name=xxx`
- **手动部署**（不走 git 时）：`cd apps/web && npx vercel --prod`
- **推送鉴权**：SSH 用专用密钥 `~/.ssh/id_ed25519_github`（已在 `~/.ssh/config` 绑定 github.com）
