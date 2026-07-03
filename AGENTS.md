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
>
> ⚠️ **本机构建坑（rolldown 原生绑定）**：Vite 8 用 rolldown 打包，`npm install` 可能因 npm optional-deps bug（npm/cli#4828）漏装 `@rolldown/binding-linux-x64-gnu`，build 报 `Cannot find native binding`。修法：`npm install @rolldown/binding-linux-x64-gnu --no-save`（不动 lockfile），或删 `node_modules`+`package-lock.json` 重装。本机已用前者修好。
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

## 部署（双轨：Vercel 全栈 + 首尔静态）

> ⚠️ **同一份源码有两套部署，互不同步、各自手动触发。** 森哥实际使用的是 `ai.dawei.host`（首尔静态）。
> - **Vercel**（全栈，含 Hono API）：`daweige-dev.vercel.app`，`git push origin main` 自动部署。
> - **首尔服务器**（纯静态，**无 API**）：自定义域名 `ai.dawei.host` → `43.166.2.116`，web 根 `/var/www/daweige`，手动 rsync `dist/`。
> 已验证：本机 `npm run build` 产物 hash（`index-B5wdR8JT.css` / `index-wn4daU9a.js`）与首尔线上一致，即首尔静态站 = 本仓库构建产物。
> nginx 配置：`/usr/local/openresty/nginx/conf/conf.d/ai.dawei.host.conf`（HTTP→HTTPS、SPA fallback、独立 SSL 证书 `ai.dawei.host` 2026-07-03~2026-10-01，自动续期随首页那套 reload hook）。

### Track 1 —— Vercel（全栈，自动）

- **GitHub 仓库**：`yusencai1996-gif/daweige`（SSH：`git@github.com:yusencai1996-gif/daweige.git`）
- **Vercel 项目**：`daweige`，已连接上述仓库，分支 `main`
- **Root Directory**：`apps/web`（Vercel 同时构建前端 `dist` 和 `api/` serverless 函数）
- **自动部署**：每次 `git push origin main` 自动触发 Vercel 构建并发布到生产域名（前端 + API 一起更新）
- **生产网址**：https://daweige-dev.vercel.app
- **线上 API**（edge 运行时）：`GET /api`、`GET /api/health`、`GET /api/hello?name=xxx`
- **手动部署**（不走 git 时）：`cd apps/web && npx vercel --prod`
- **推送鉴权**：SSH 用专用密钥 `~/.ssh/id_ed25519_github`（已在 `~/.ssh/config` 绑定 github.com）

### Track 2 —— 首尔静态（`ai.dawei.host`，手动 rsync）

森哥用的就是这个。改完前端后部署（只推前端 `dist/`，不含 API）：

```bash
npm run build   # 在仓库根，产物在 apps/web/dist/
rsync -avz --delete \
  -e "ssh -i /home/administrator/.ssh/id_ed25519_1panel" \
  /home/administrator/liulanqishouye/daweige/apps/web/dist/ \
  ubuntu@43.166.2.116:/var/www/daweige/
```

> 首尔站是**纯静态托管，没有 `/api`**。前端 `App.tsx:10` 会 `fetch("/api/hello?name=daweige")`（结果不渲染，仅作后端联通探测），在 `ai.dawei.host` 上这条请求会 **404**——页面不报错，但 network 面板能看到失败。两套并存的理由：Vercel 需代理访问（海外用），首尔国内直连可达。
